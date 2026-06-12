import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

/** カードの面調子: 標準パネル / 夜コース風に朱グローを重ねた主役面 */
export type CardVariant = 'panel' | 'feature';

/** Cardコンポーネントのprops */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 視覚バリアント（既定: panel） */
  variant?: CardVariant;
  /** グレイン（フィルム質感）を重ねるか */
  grain?: boolean;
  /** 内側パディングを無効化（メディア面など余白を自前管理する場合） */
  flush?: boolean;
  /** 内容 */
  children?: ReactNode;
}

/** 主役面（feature）に重ねる朱のラジアルグロー背景 */
const FEATURE_BG =
  'radial-gradient(120% 80% at 70% 0%, rgba(158,59,46,0.10), transparent 60%), #211C18';

/** グレイン（SVGノイズ）を overlay で薄く重ねるオーバーレイ要素 */
function GrainOverlay() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/**
 * 炭墨パネルのカード。角丸2px・燻し金の極薄枠。featureで朱グローの主役面に。
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'panel', grain, flush, className = '', style, children, ...rest },
  ref,
) {
  const base =
    'relative overflow-hidden rounded-card border border-[rgba(182,146,92,0.12)] ' +
    (flush ? '' : 'p-6 md:p-8 ');
  const bgStyle =
    variant === 'feature' ? { background: FEATURE_BG, ...style } : { backgroundColor: '#211C18', ...style };

  return (
    <div ref={ref} className={`${base}${className}`} style={bgStyle} {...rest}>
      {grain ? <GrainOverlay /> : null}
      {grain ? <div className="relative">{children}</div> : children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
