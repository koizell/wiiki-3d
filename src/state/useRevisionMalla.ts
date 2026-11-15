import { useCallback, useEffect, useRef, useState } from 'react'
import type { FileType } from '../lib/files'
import type { AnalisisMalla, ResumenReparacion, SesionMalla } from '../services/reparacionMalla'
import type { ProgressEvent } from 'meshfix-wasm'

/** MB decimales: 1 MB = 1.000.000 bytes. */
export const LIMITE_AVISO_MB = 60
export const LIMITE_RECHAZO_MB = 150

export type FaseRevisionMalla = 'inactivo' | 'analizando' | 'listo' | 'reparando' | 'reparado' | 'error'
export interface RevisionMalla {
  fase: FaseRevisionMalla
  analisis: AnalisisMalla | null
  progreso: ProgressEvent | null
  resumen: ResumenReparacion | null
  error: string | null
  avisoTamano: boolean
  urlDescarga: string | null
  reparar(): void
  rellenarAberturas(): void
}
type Datos = Omit<RevisionMalla, 'reparar' | 'rellenarAberturas'>
type Control = {
  file: File
  controller: AbortController
  session?: SesionMalla
  url?: string
  busy: boolean
  activo: boolean
}
const vacio: Datos = { fase: 'inactivo', analisis: null, progreso: null, resumen: null, error: null, avisoTamano: false, urlDescarga: null }
const aviso = (file: File) => file.size > LIMITE_AVISO_MB * 1_000_000
const mensaje = (error: unknown) => error instanceof Error ? error.message : String(error)

export function useRevisionMalla(file: File | null, fileType: FileType | null): RevisionMalla {
  const [estado, setEstado] = useState<{ file: File | null; datos: Datos }>({ file: null, datos: vacio })
  const control = useRef<Control | null>(null)

  useEffect(() => {
    if (!file || fileType !== 'stl') {
      let activo = true
      queueMicrotask(() => { if (activo) setEstado({ file: null, datos: vacio }) })
      return () => { activo = false }
    }
    const actual: Control = { file, controller: new AbortController(), busy: true, activo: true }
    control.current = actual
    const publicar = (datos: Datos) => { if (actual.activo) setEstado({ file, datos }) }
    const iniciar = async () => {
      const inicial = { ...vacio, fase: 'analizando' as const, avisoTamano: aviso(file) }
      publicar(inicial)
      try {
        if (file.size > LIMITE_RECHAZO_MB * 1_000_000) throw new Error('El STL supera el límite de 150 MB.')
        const buffer = await file.arrayBuffer()
        if (!actual.activo) return
        const { crearSesionMalla } = await import('../services/reparacionMalla')
        if (!actual.activo) return
        actual.session = await crearSesionMalla({ signal: actual.controller.signal })
        const analisis = await actual.session.analizar(buffer)
        publicar({ ...inicial, fase: 'listo', analisis })
      } catch (error) {
        actual.session?.dispose()
        actual.session = undefined
        publicar({ ...inicial, fase: 'error', error: mensaje(error) })
      } finally { actual.busy = false }
    }
    void iniciar()
    return () => {
      actual.activo = false
      actual.controller.abort()
      actual.session?.dispose()
      if (actual.url) URL.revokeObjectURL(actual.url)
      if (control.current === actual) control.current = null
    }
  }, [file, fileType])

  const ejecutar = useCallback((forzar: boolean) => {
    const actual = control.current
    if (!actual || actual.file !== file || fileType !== 'stl' || !actual.activo || actual.busy) return
    actual.busy = true
    const actualizar = (cambio: (datos: Datos) => Datos) => {
      if (actual.activo) setEstado(prev => prev.file === actual.file ? { ...prev, datos: cambio(prev.datos) } : prev)
    }
    void (async () => {
      actualizar(d => ({ ...d, fase: 'reparando', progreso: null, error: null }))
      try {
        if (!actual.session) {
          if (actual.file.size > LIMITE_RECHAZO_MB * 1_000_000) throw new Error('El STL supera el límite de 150 MB.')
          const buffer = await actual.file.arrayBuffer()
          if (!actual.activo) return
          const { crearSesionMalla } = await import('../services/reparacionMalla')
          if (!actual.activo) return
          actual.session = await crearSesionMalla({ signal: actual.controller.signal })
          const analisis = await actual.session.analizar(buffer)
          actualizar(d => ({ ...d, analisis }))
        }
        const progreso = (evento: ProgressEvent) => actualizar(d => ({ ...d, progreso: evento }))
        const resumen = await (forzar ? actual.session.rellenarAberturas(progreso) : actual.session.reparar(progreso))
        const buffer = await actual.session.exportar()
        if (!actual.activo) return
        const url = URL.createObjectURL(new Blob([buffer], { type: 'model/stl' }))
        if (actual.url) URL.revokeObjectURL(actual.url)
        actual.url = url
        actualizar(d => ({ ...d, fase: 'reparado', progreso: null, resumen, urlDescarga: url }))
      } catch (error) {
        actual.session?.dispose()
        actual.session = undefined
        actualizar(d => ({ ...d, fase: 'error', progreso: null, error: mensaje(error) }))
      } finally { actual.busy = false }
    })()
  }, [file, fileType])

  const reparar = useCallback(() => ejecutar(false), [ejecutar])
  const rellenarAberturas = useCallback(() => ejecutar(true), [ejecutar])
  const seleccionado = fileType === 'stl' ? file : null
  const datos = estado.file === seleccionado ? estado.datos : seleccionado
    ? { ...vacio, fase: 'analizando' as const, avisoTamano: aviso(seleccionado) }
    : vacio
  return { ...datos, reparar, rellenarAberturas }
}
