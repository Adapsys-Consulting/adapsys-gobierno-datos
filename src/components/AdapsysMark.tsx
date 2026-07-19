/**
 * Marca Adapsys: wordmark vectorial (texto) ADAP · SYS con guion bajo (cursor)
 * que se dibuja y luego parpadea. El guion bajo va a la LÍNEA BASE (align-items:
 * flex-end), no centrado (si no, parece guion medio). Respeta prefers-reduced-motion.
 *  - `hero` → grande, blanca sobre fondo oscuro, con eyebrow (portada).
 *  - `bar`  → compacta, tinta sobre fondo claro (topbar).
 */
export default function AdapsysMark({ variant = 'hero', eyebrow = 'Plataforma por' }: { variant?: 'hero' | 'bar'; eyebrow?: string }) {
  if (variant === 'bar') {
    return (
      <span className="am-bar" role="img" aria-label="Adapsys">
        <span className="am-line">ADAP</span>
        <span className="am-line am-2">SYS<span className="am-cursor" aria-hidden="true" /></span>
      </span>
    );
  }
  return (
    <div className="adapsys-mark" role="img" aria-label="Adapsys">
      {eyebrow && <span className="am-eyebrow">{eyebrow}</span>}
      <span className="am-word">
        <span className="am-line am-1">ADAP</span>
        <span className="am-line am-2">SYS<span className="am-cursor" aria-hidden="true" /></span>
      </span>
    </div>
  );
}
