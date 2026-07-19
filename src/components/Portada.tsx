import type { Meta, Sesion } from '../lib/tipos';
import { FUENTES, componerBanco, contarPreguntasBanco } from '../data/banco';
import { contarRespondidas } from '../lib/scoring';
import { etiquetaSesion } from '../lib/persistencia';
import BrandMark from './BrandMark';
import Leyenda from './Leyenda';

interface PortadaProps {
  meta: Meta;
  onMeta: (campo: keyof Meta, valor: string | boolean) => void;
  onComenzar: () => void;
  onImportarClick: () => void;
  sesiones: Sesion[];
  activaId: string | null;
  total: number;
  dias: number;
  onNuevaSesion: () => void;
  onAbrirSesion: (id: string) => void;
  onEliminarSesion: (id: string) => void;
  onVerConsolidado: () => void;
}

function fechaCorta(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('es-CL');
}

export default function Portada({
  meta, onMeta, onComenzar, onImportarClick,
  sesiones, activaId, total, dias,
  onNuevaSesion, onAbrirSesion, onEliminarSesion, onVerConsolidado,
}: PortadaProps) {
  const bancoDe = (s: Sesion) => componerBanco(!!s.meta.sectorSalud);
  const conDatos = sesiones.filter((s) => contarRespondidas(bancoDe(s), s.respuestas) > 0);
  const activaS = sesiones.find((s) => s.id === activaId);
  const respondidasActiva = activaS ? contarRespondidas(bancoDe(activaS), activaS.respuestas) : 0;

  return (
    <section className="view">
      <div className="wrap">
        {/* Hero editorial */}
        <div className="hero-cover">
          <div className="hero-top">
            <div>
              <div className="eyebrow">Diagnóstico de madurez · Sector público</div>
              <h1>¿Qué tan preparada está tu institución para la Ley 21.719?</h1>
            </div>
            <BrandMark variant="hero" eyebrow="Plataforma de" />
          </div>
          <p className="hero-lede">
            Un instrumento estructurado y repetible para medir —en lenguaje claro— la madurez de tu institución
            frente a la <b>nueva Ley de Protección de Datos Personales (Ley&nbsp;21.719)</b> y al{' '}
            <b>Marco de Gestión de Datos del Estado (MGDE)</b>. Pensado para instituciones que recién comienzan:
            no se necesita DPO ni una gobernanza formada — el diagnóstico sirve para levantar el estado actual e
            impulsar esa estrategia.
          </p>
          <div className="hero-stats">
            <div className="hero-stat accent">
              <div className="n tnum">{dias > 0 ? dias : 0}</div>
              <div className="l">días para el <b>1-dic-2026</b>, cuando la Agencia comienza a fiscalizar</div>
            </div>
            <div className="hero-stat">
              <div className="n tnum">{total}</div>
              <div className="l">preguntas · 45–60 min en reunión por área (15–20 min individual)</div>
            </div>
            <div className="hero-stat">
              <div className="n">2<span style={{ fontSize: '18px', opacity: 0.6 }}>+1</span></div>
              <div className="l">módulos: Ley 21.719 + Gobernanza, y salud opcional</div>
            </div>
          </div>
        </div>

        {/* Cómo funciona + escala */}
        <div className="card">
          <div className="note" style={{ marginBottom: '14px' }}>
            🔒 <b>Privacidad.</b> Esta herramienta funciona por completo en tu navegador.{' '}
            <b>Ninguna respuesta se envía a internet ni a ningún servidor.</b> El avance se guarda solo en este
            equipo y tú decides si lo exportas como archivo.
          </div>
          <div className="note" style={{ marginBottom: '18px' }}>
            ⚖️ <b>Uso referencial.</b> Este formulario apoya el diagnóstico y el desarrollo del gobierno de datos
            institucional y <b>no constituye asesoría legal</b>. Se sugiere que el equipo jurídico de cada institución
            valide su contenido antes de un uso formal — al menos las preguntas marcadas para validación jurídica (⚠️).
          </div>

          <h3>¿Cómo se responde?</h3>
          <p className="muted" style={{ marginTop: 0 }}>
            Cada afirmación se evalúa según el <b>nivel de madurez</b> que mejor refleja la realidad de tu institución:
          </p>
          <Leyenda />
          <p className="muted small" style={{ marginTop: '14px' }}>
            Hay dos marcas que <b>no se promedian</b> y se listan aparte como pendientes: <b>«No sé»</b> (no sabemos si
            lo hacemos o cumplimos — conviene cerrarla con el área) y <b>«No aplica»</b> (el tratamiento o deber no
            corresponde a la institución). El cuestionario avanza <b>por bloques temáticos</b> (una dimensión a la vez)
            y <b>cada respuesta se guarda automáticamente</b>: puedes pausar y retomar, y al volver continúa en el
            primer bloque pendiente.
          </p>
        </div>

        {/* Datos de la sesión */}
        <div className="card">
          <div className="section-title"><span className="num">01</span><h2>Datos de esta sesión</h2></div>
          <p className="muted small" style={{ marginTop: '8px' }}>
            Recomendado responder en equipo con quienes conocen el tema: <b>jefatura, jurídica, TI/seguridad y quienes
            administran los sistemas y datos del área</b>. Si aún no existen roles formales (DPO, dueños de datos),
            respondan igual: esa brecha es parte del diagnóstico. (Todos los campos son opcionales.)
          </p>
          <div className="grid2">
            <div>
              <label className="field" htmlFor="m-inst">Institución / Subsecretaría / Servicio</label>
              <input className="txt" id="m-inst" value={meta.institucion ?? ''} onChange={(e) => onMeta('institucion', e.target.value)} placeholder="Ej: Servicio, Subsecretaría o Dirección" />
            </div>
            <div>
              <label className="field" htmlFor="m-area">Área / Unidad / Departamento</label>
              <input className="txt" id="m-area" value={meta.area ?? ''} onChange={(e) => onMeta('area', e.target.value)} placeholder="Ej: Unidad de Gestión de la Información" />
            </div>
            <div>
              <label className="field" htmlFor="m-rol">Rol de quien responde</label>
              <select className="txt" id="m-rol" value={meta.rol ?? ''} onChange={(e) => onMeta('rol', e.target.value)}>
                <option value="">Seleccione…</option>
                <option>Dirección / Jefatura</option>
                <option>Jurídico / DPO</option>
                <option>TI / Seguridad de la información</option>
                <option>Dueño(a) / responsable de datos</option>
                <option>Equipo de datos / Analítica</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="field" htmlFor="m-eval">Nombre / equipo (opcional)</label>
              <input className="txt" id="m-eval" value={meta.evaluador ?? ''} onChange={(e) => onMeta('evaluador', e.target.value)} placeholder="Ej: Comité de datos" />
            </div>
            <div>
              <label className="field" htmlFor="m-part">Participantes de la reunión (opcional)</label>
              <input className="txt" id="m-part" value={meta.participantes ?? ''} onChange={(e) => onMeta('participantes', e.target.value)} placeholder="Ej: jefatura del área, referente TI, encargado(a) de datos" />
            </div>
          </div>

          <label className="note" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '16px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!meta.sectorSalud}
              onChange={(e) => onMeta('sectorSalud', e.target.checked)}
              style={{ marginTop: '3px', flexShrink: 0 }}
            />
            <span>
              🏥 <b>Esta institución pertenece al sector salud.</b> Agrega un <b>módulo sectorial opcional</b> (Módulo C):
              régimen reforzado de datos de salud (art. 16 bis), ficha clínica (Ley 20.584 / Decreto 41/2012) e
              interoperabilidad clínica. Déjalo sin marcar si no corresponde.
            </span>
          </label>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn" onClick={onComenzar}>
              {respondidasActiva > 0 ? 'Continuar sesión →' : 'Comenzar diagnóstico →'}
            </button>
            <button className="btn ghost" onClick={onImportarClick}>Importar respuestas (JSON)</button>
          </div>
          {respondidasActiva > 0 && (
            <p className="muted small" style={{ marginTop: '10px' }}>
              📌 La sesión actual tiene {respondidasActiva} de {total} preguntas respondidas.
            </p>
          )}
        </div>

        {/* Levantamiento por áreas */}
        <div className="card">
          <div className="section-title"><span className="num">02</span><h2>Levantamiento por áreas y departamentos</h2></div>
          <p className="muted small" style={{ marginTop: '8px' }}>
            Cada reunión de levantamiento se registra como una <b>sesión</b> separada (una por área o departamento).
            Puedes alternar entre sesiones, exportar cada una como JSON para respaldarla o compartirla, y ver el{' '}
            <b>consolidado institucional</b> cuando haya más de un área evaluada. Estas sesiones cumplen el rol de las{' '}
            <b>reuniones de trabajo por área</b> que la Guía SGD del Ministerio de Hacienda recomienda para el
            levantamiento de información de la Ley 21.719.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Sesión</th>
                  <th>Rol</th>
                  <th>Avance</th>
                  <th>Actualizada</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sesiones.map((s, i) => {
                  const n = contarRespondidas(bancoDe(s), s.respuestas);
                  const tot = contarPreguntasBanco(bancoDe(s));
                  const esActiva = s.id === activaId;
                  return (
                    <tr key={s.id} className={esActiva ? 'ses-activa' : undefined}>
                      <td>
                        <b>{etiquetaSesion(s, i)}</b>
                        {esActiva && <span className="pill">actual</span>}
                      </td>
                      <td className="muted">{s.meta.rol || '—'}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {n}/{tot} {n === 0 && <span className="muted small">(sin respuestas)</span>}
                      </td>
                      <td className="muted" style={{ whiteSpace: 'nowrap' }}>{fechaCorta(s.actualizada)}</td>
                      <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                        <button className="btn ghost mini" onClick={() => onAbrirSesion(s.id)}>Abrir</button>{' '}
                        <button className="btn ghost mini peligro" onClick={() => onEliminarSesion(s.id)} title="Eliminar esta sesión de este equipo">Eliminar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn secondary" onClick={onNuevaSesion}>＋ Nueva sesión (otra área/reunión)</button>
            <button className="btn" onClick={onVerConsolidado} disabled={conDatos.length === 0} title={conDatos.length === 0 ? 'Aún no hay sesiones con respuestas' : undefined}>
              Ver consolidado ({conDatos.length} {conDatos.length === 1 ? 'área' : 'áreas'}) →
            </button>
          </div>
        </div>

        <footer>
          <b>Fuentes:</b>{' '}
          {FUENTES.map((f, i) => (
            <span key={f[1]}>
              {i > 0 ? ' · ' : ''}
              <a href={f[1]} target="_blank" rel="noopener noreferrer">{f[0]}</a>
            </span>
          ))}
        </footer>
      </div>
    </section>
  );
}
