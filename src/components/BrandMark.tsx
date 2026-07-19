/**
 * Marca animada Adapsys — wordmark tipográfico con guion bajo (cursor) que se
 * dibuja y parpadea sobre la LÍNEA BASE (no centrado, o parece guion medio).
 * Dos variantes:
 *  - `bar`  → compacta, tinta sobre fondo claro (topbar).
 *  - `hero` → grande, blanca sobre fondo oscuro, con eyebrow (portada).
 */
export default function BrandMark({ variant = 'bar', eyebrow }: { variant?: 'bar' | 'hero'; eyebrow?: string }) {
  if (variant === 'hero') {
    return (
      <div className="brand-mark" role="img" aria-label="adapsys">
        {eyebrow && <span className="bm-eyebrow">{eyebrow}</span>}
        <span className="bm-word">
          <span className="bm-text">adapsys</span>
          <span className="bm-cursor" aria-hidden="true" />
        </span>
      </div>
    );
  }
  return (
    <span className="tb-word" role="img" aria-label="adapsys">
      adapsys<span className="bm-cursor" aria-hidden="true" />
    </span>
  );
}
