import type { MeshFixWorker, MeshAnalysis, MeshIssue, RepairResult, FillHolesResult, ProgressEvent, HoleInfo } from 'meshfix-wasm'

export interface AnalisisMalla {
  analysis: MeshAnalysis
  incidencias: MeshIssue[]
  aberturas: HoleInfo[]
  esCerrada: boolean
  esManifold: boolean
  colorsDropped?: boolean
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

async function iniciarWorker(): Promise<MeshFixWorker> {
  const { MeshFixWorker } = await import('meshfix-wasm')
  const base = new URL(`${import.meta.env.BASE_URL}meshfix/`, window.location.href)
  return MeshFixWorker.init({
    workerUrl: new URL('worker.js', base),
    coreUrl: new URL('meshfix-core.js', base).href,
    wasmUrl: new URL('meshfix-core.wasm', base).href,
  })
}

async function resultado(worker: MeshFixWorker, data: Awaited<ReturnType<MeshFixWorker['reanalyze']>>): Promise<AnalisisMalla> {
  return {
    analysis: data.analysis,
    incidencias: data.issues,
    aberturas: await worker.describeHoles(),
    esCerrada: data.analysis.isWatertight,
    esManifold: data.analysis.isManifold,
    colorsDropped: data.colorsDropped,
  }
}

export async function crearSesionMalla(): Promise<SesionMalla> {
  let worker = await iniciarWorker()
  let original: ArrayBuffer | undefined
  let disposed = false
  let candidate: MeshFixWorker | undefined
  let busy = false
  const check = () => { if (disposed) throw new Error('Sesión de malla cancelada') }
  return {
    async analizar(buffer) {
      check()
      if (buffer.byteLength < 15) throw new Error('STL vacío o inválido')
      // Un STL binario declara exactamente 50 bytes por triángulo.
      if (buffer.byteLength >= 84) {
        const count = new DataView(buffer).getUint32(80, true)
        const prefix = new TextDecoder().decode(buffer.slice(0, 5)).toLowerCase()
        if (prefix !== 'solid' && 84 + count * 50 > buffer.byteLength) throw new Error('STL binario truncado')
      }
      const copia = buffer.slice(0)
      const data = await worker.analyzeDetailed(buffer.slice(0), 'stl')
      check()
      if (!data.analysis.faceCount) throw new Error('STL vacío o inválido')
      const analisis = await resultado(worker, data)
      check()
      original = copia
      return analisis
    },
    async reparar(onProgreso) {
      check()
      if (!original) throw new Error('Primero analiza un STL')
      if (busy) throw new Error('Ya hay una operación en curso')
      busy = true
      try {
        // Mantener el resultado anterior hasta que la operación completa tenga éxito.
        candidate = await iniciarWorker()
        check()
        await candidate.analyzeDetailed(original.slice(0), 'stl')
        const reparacion = await candidate.repair({}, onProgreso)
        const analisis = await resultado(candidate, await candidate.reanalyze())
        check()
        worker.dispose()
        worker = candidate
        candidate = undefined
        return { reparacion, analisis }
      } finally {
        candidate?.dispose()
        candidate = undefined
        busy = false
      }
    },
    async rellenarAberturas(onProgreso) {
      check()
      if (!original) throw new Error('Primero analiza un STL')
      if (busy) throw new Error('Ya hay una operación en curso')
      busy = true
      try {
        candidate = await iniciarWorker()
        check()
        await candidate.analyzeDetailed(original.slice(0), 'stl')
        const reparacion = await candidate.repair({}, onProgreso)
        const rellenoForzado = await candidate.fillHoles(100, true)
        const analisis = await resultado(candidate, await candidate.reanalyze())
        check()
        worker.dispose()
        worker = candidate
        candidate = undefined
        return { reparacion, rellenoForzado, analisis }
      } finally {
        candidate?.dispose()
        candidate = undefined
        busy = false
      }
    },
    async exportar() {
      check()
      if (!original) throw new Error('Primero analiza un STL')
      const data = await worker.exportMesh('stl')
      check()
      return data
    },
    dispose() {
      disposed = true
      worker.dispose()
      candidate?.dispose()
      original = undefined
    },
  }
}
