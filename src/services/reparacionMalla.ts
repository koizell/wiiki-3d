import type { MeshAnalysis, MeshIssue, RepairResult, FillHolesResult, ProgressEvent, HoleInfo } from 'meshfix-wasm'

export interface AnalisisMalla {
  analysis: MeshAnalysis
  incidencias: MeshIssue[]
  aberturas: HoleInfo[]
  esCerrada: boolean
  esManifold: boolean
  colorsDropped?: boolean
  carasNoFinitasEliminadas: number
  reconstruccionesConectividad: number
  carasPerdidasAuditoria: number
}
export interface ResumenReparacion {
  reparacion: RepairResult
  rellenoForzado?: FillHolesResult
  analisis: AnalisisMalla
}
export type ProgresoMalla = (evento: ProgressEvent) => void
export interface SesionMalla {
  analizar(buffer: ArrayBuffer): Promise<AnalisisMalla>
  reparar(onProgreso?: ProgresoMalla): Promise<ResumenReparacion>
  rellenarAberturas(onProgreso?: ProgresoMalla): Promise<ResumenReparacion>
  exportar(): Promise<ArrayBuffer>
  dispose(): void
}
export interface OpcionesSesionMalla {
  signal?: AbortSignal
  /** Límite por petición al worker; no es un límite de tamaño del archivo. */
  plazoMs?: number
}

type Respuesta = { id: number; result?: unknown; error?: { message: string }; type?: undefined }
type Progreso = { type: 'progress'; requestId: number } & ProgressEvent
type DatosAnalisis = { analysis: MeshAnalysis; colorsDropped?: boolean }

// Protocolo del worker clásico de meshfix-wasm 0.6.1. El bridge del paquete no
// permite cancelar init y no rechaza llamadas posteriores a un error fatal.
class Motor {
  private worker: Worker
  private base: URL
  private plazo: number
  private siguiente = 0
  private fatal?: Error
  private pendientes = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void; timer: ReturnType<typeof setTimeout>; progreso?: ProgresoMalla }>()

  constructor(base: URL, plazo: number) {
    this.base = base
    this.plazo = plazo
    this.worker = new Worker(new URL('worker.js', base))
    this.worker.onmessage = (event: MessageEvent<Respuesta | Progreso>) => {
      const data = event.data
      if (data.type === 'progress') {
        try { this.pendientes.get(data.requestId)?.progreso?.(data) } catch { /* el observador no controla el worker */ }
        return
      }
      const pendiente = this.pendientes.get(data.id)
      if (!pendiente) return
      this.pendientes.delete(data.id)
      clearTimeout(pendiente.timer)
      if (data.error) pendiente.reject(new Error(data.error.message))
      else pendiente.resolve(data.result)
    }
    this.worker.onerror = event => { event.preventDefault(); this.terminar(new Error(event.message || 'Error del worker')) }
    this.worker.onmessageerror = () => this.terminar(new Error('Respuesta inválida del worker'))
  }
  async init() {
    await this.call('init', { coreUrl: new URL('meshfix-core.js', this.base).href, wasmUrl: new URL('meshfix-core.wasm', this.base).href })
  }
  call<T>(method: string, params: Record<string, unknown> = {}, buffer?: ArrayBuffer, progreso?: ProgresoMalla): Promise<T> {
    if (this.fatal) return Promise.reject(this.fatal)
    return new Promise<T>((resolve, reject) => {
      const id = ++this.siguiente
      const timer = setTimeout(() => this.terminar(new Error(`Tiempo agotado en ${method}`)), this.plazo)
      this.pendientes.set(id, { resolve: value => resolve(value as T), reject, timer, progreso })
      try {
        this.worker.postMessage({ id, method, params, ...(buffer ? { buffer } : {}) }, buffer ? [buffer] : [])
      } catch (error) {
        this.terminar(error instanceof Error ? error : new Error(String(error)))
      }
    })
  }
  terminar(error = new Error('Sesión de malla cancelada')) {
    if (this.fatal) return
    this.fatal = error
    this.worker.terminate()
    for (const pending of this.pendientes.values()) {
      clearTimeout(pending.timer)
      pending.reject(error)
    }
    this.pendientes.clear()
  }
}

function validarSTL(buffer: ArrayBuffer) {
  if (buffer.byteLength < 15) throw new Error('STL vacío o inválido')
  // Un encabezado binario también puede comenzar por "solid". Sólo se acepta
  // como texto si es UTF-8 imprimible y contiene la estructura ASCII completa.
  if (buffer.byteLength >= 84) {
    const count = new DataView(buffer).getUint32(80, true)
    if (84 + count * 50 === buffer.byteLength) return
  }
  let text = ''
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(buffer) } catch { /* binario */ }
  const ascii = !Array.from(text).some(char => {
    const code = char.charCodeAt(0)
    return code < 32 && code !== 9 && code !== 10 && code !== 13
  })
    && /^\s*solid(?:\s|$)/i.test(text)
    && /\bfacet\s+normal\b/i.test(text)
    && /\bendsolid(?:\s|$)/i.test(text)
  if (!ascii) throw new Error('STL binario truncado o STL inválido')
}

export async function crearSesionMalla(opciones: OpcionesSesionMalla = {}): Promise<SesionMalla> {
  const plazo = opciones.plazoMs ?? 120_000
  if (!Number.isFinite(plazo) || plazo <= 0) throw new Error('Plazo de worker inválido')
  const basePath = import.meta.env.BASE_URL
  if (!basePath.startsWith('/')) throw new Error('La base relativa de Vite no es compatible con el motor STL')
  const base = new URL(`${basePath}meshfix/`, window.location.origin)
  if (opciones.signal?.aborted) throw new Error('Sesión de malla cancelada')
  const { buildIssues } = await import('meshfix-wasm')
  if (opciones.signal?.aborted) throw new Error('Sesión de malla cancelada')
  let worker: Motor | undefined
  let candidate: Motor | undefined
  let original: ArrayBuffer | undefined
  let disposed = false
  let busy = false
  const check = () => { if (disposed || opciones.signal?.aborted) throw new Error('Sesión de malla cancelada') }
  const dispose = () => {
    if (disposed) return
    disposed = true
    worker?.terminar()
    candidate?.terminar()
    original = undefined
    opciones.signal?.removeEventListener('abort', dispose)
  }
  opciones.signal?.addEventListener('abort', dispose, { once: true })
  const crearMotor = async () => {
    check()
    candidate = new Motor(base, plazo)
    await candidate.init()
    check()
    return candidate
  }
  const resultado = async (motor: Motor, data: DatosAnalisis): Promise<AnalisisMalla> => {
    const aberturas = await motor.call<HoleInfo[]>('describeHoles')
    const carasNoFinitasEliminadas = await motor.call<number>('nonFiniteFacesRemoved')
    const reconstruccionesConectividad = await motor.call<number>('connectivityRebuilds')
    const carasPerdidasAuditoria = await motor.call<number>('facesDroppedByAudit')
    return { analysis: data.analysis, incidencias: buildIssues(data.analysis), aberturas, esCerrada: data.analysis.isWatertight, esManifold: data.analysis.isManifold, colorsDropped: data.colorsDropped, carasNoFinitasEliminadas, reconstruccionesConectividad, carasPerdidasAuditoria }
  }
  const exclusiva = async <T>(accion: () => Promise<T>): Promise<T> => {
    check()
    if (busy) throw new Error('Ya hay una operación en curso')
    busy = true
    try { return await accion() } finally {
      candidate?.terminar()
      candidate = undefined
      busy = false
    }
  }
  const publicar = (motor: Motor) => {
    check()
    worker?.terminar()
    worker = motor
    candidate = undefined
  }
  try {
    const inicial = await crearMotor()
    publicar(inicial)
  } catch (error) {
    dispose()
    throw error
  }
  return {
    analizar(buffer) {
      return exclusiva(async () => {
        validarSTL(buffer)
        const copia = buffer.slice(0)
        const motor = await crearMotor()
        const data = await motor.call<DatosAnalisis>('analyzeDetailed', { format: 'stl' }, copia.slice(0))
        if (!data.analysis.faceCount) throw new Error('STL vacío o inválido')
        const analisis = await resultado(motor, data)
        check()
        publicar(motor)
        original = copia
        return analisis
      })
    },
    reparar(onProgreso) { return reparar(false, onProgreso) },
    rellenarAberturas(onProgreso) { return reparar(true, onProgreso) },
    exportar() {
      return exclusiva(async () => {
        if (!original || !worker) throw new Error('Primero analiza un STL')
        const data = await worker.call<{ buffer: ArrayBuffer }>('exportMesh', { format: 'stl' })
        check()
        return data.buffer
      })
    },
    dispose,
  }
  function reparar(forzar: boolean, onProgreso?: ProgresoMalla): Promise<ResumenReparacion> {
    return exclusiva(async () => {
      if (!original) throw new Error('Primero analiza un STL')
      const motor = await crearMotor()
      await motor.call('analyzeDetailed', { format: 'stl' }, original.slice(0))
      const reparacion = await motor.call<RepairResult>('repair', {}, undefined, onProgreso)
      const rellenoForzado = forzar ? await motor.call<FillHolesResult>('fillHoles', { maxEdges: 100, fillFeatures: true }) : undefined
      const analisis = await resultado(motor, await motor.call<DatosAnalisis>('reanalyze'))
      publicar(motor)
      return { reparacion, rellenoForzado, analisis }
    })
  }
}
