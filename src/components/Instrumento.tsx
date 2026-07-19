import type { CSSProperties } from 'react';
import CountUp from 'react-countup';
import { motion, useReducedMotion } from 'framer-motion';
import { nivelDe, mgdeDe, colorDe, fmt } from '../lib/scoring';

export interface FilaInstrumento {
  label: string;
  value: number | null;
  critica?: boolean;
}

interface InstrumentoProps {
  /** Puntaje global 1..5 (o null sin datos). */
  global: number | null;
  /** Filas a graficar sobre el eje 0–5 (típicamente los módulos). */
  filas: FilaInstrumento[];
  /** Dimensiones bajo la meta / total evaluadas (para el subtítulo). */
  dimsBajoMeta: number;
  dimsEvaluadas: number;
  /** Nivel meta (por defecto 3 «Definido»). */
  meta?: number;
}

/**
 * Instrumento firma: cifra de madurez global + dot-plot de los módulos sobre un
 * eje compartido 0–5, con la banda/marca de la meta institucional (nivel 3).
 * Comunica «dónde está parado todo» de un vistazo. Respeta reduced-motion.
 */
export default function Instrumento({ global, filas, dimsBajoMeta, dimsEvaluadas, meta = 3 }: InstrumentoProps) {
  const reduce = useReducedMotion();
  const nv = nivelDe(global);
  return (
    <div className="card instrumento">
      <section className="hero" style={heroStyle}>
        {/* Cifra global */}
        <div className="hero-lead">
          <div className="eyebrow">Madurez global</div>
          <div className="hero-figure">
            <span className="hero-num">
              {global === null ? 'N/D' : <CountUp end={global} duration={1.3} decimals={1} />}
            </span>
            {global !== null && <span className="hero-unit">/5</span>}
          </div>
          <div className="hero-class">
            <span className="dot" style={{ background: colorDe(global) }} />
            {nv.nombre}{global !== null && <> · {mgdeDe(global)}</>}
          </div>
          <div className="hero-meta">
            Meta institucional: <b>nivel {meta} «Definido»</b>
            <br />
            {dimsEvaluadas > 0
              ? <><b>{dimsBajoMeta}</b> de <b>{dimsEvaluadas}</b> dimensiones bajo la meta</>
              : 'Aún sin dimensiones evaluadas'}
          </div>
        </div>

        {/* Dot-plot de módulos sobre eje 0–5 */}
        <div className="hero-plot">
          <div className="hero-plot-head"><span className="eyebrow">Por módulo</span></div>
          <ul className="dotplot">
            {filas.map((f, i) => {
              const v = f.value;
              const pct = v === null ? 0 : Math.min(100, (v / 5) * 100);
              const c = colorDe(v);
              return (
                <li className="dp-row" key={f.label} style={{ ['--dpc']: c } as CSSProperties}>
                  <span className="dp-rank">{String(i + 1).padStart(2, '0')}</span>
                  <span className="dp-name">
                    {f.label}
                    {f.critica && <span className="pill crit">crítica</span>}
                  </span>
                  <div
                    className="dp-track"
                    role="img"
                    aria-label={`${f.label}: ${v === null ? 'sin datos' : fmt(v) + ' de 5, nivel ' + nivelDe(v).nombre}`}
                  >
                    <span className="dp-meta-line" aria-hidden="true" />
                    {v !== null && (
                      <motion.div
                        className="dp-fill"
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className="dp-dot" style={{ left: '100%' }} />
                      </motion.div>
                    )}
                  </div>
                  <span className="dp-tail">
                    <span className="dp-val" style={{ color: c }}>{v === null ? 'N/D' : fmt(v)}</span>
                    <span className="dp-lvl">{nivelDe(v).nombre}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="dotplot-axis" aria-hidden="true">
            <span>0</span><span>1</span><span>2</span><span className="meta-tick">3 · meta</span><span>4</span><span>5</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const heroStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(200px, .8fr) 1.7fr',
  gap: '38px',
  alignItems: 'center',
};
