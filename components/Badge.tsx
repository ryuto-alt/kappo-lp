import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

/** バッジの調子: 燻し金枠 / 弁柄(朱) / 欧文ラベル(eyebrow)調 */
export type BadgeVariant = 'kin' | 'bengara' | 'label-en';

/** Badgeコンポーネントのprops */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 視覚バリアント（既定: kin） */
  variant?: BadgeVariant;
  /** 先頭に置く小さなドット印を表示するか */
  dot?: boolean;
  /** 内容 */
  children?: ReactNode;
}

/** バリアント別の地・枠・文字・書体スタイル */
const variantClasses: Record<BadgeVariant, string> = {
  kin:
    'font-body text-kin border border-[rgba(182,146,92,0.45)] bg-[rgba(182,146,92,0.06)] ' +
    'text-[0.74rem] tracking-[0.1em] px-3 py-1',
  bengara:
    'font-body text-bengara-text border border-[rgba(199,90,74,0.45)] bg-[rgba(158,59,46,0.12)] ' +
    'text-[0.74rem] tracking-[0.1em] px-3 py-1',
  'label-en':
    'font-latin italic text-kin tracking-[0.04em] text-[0.82rem] px-0 py-0 border-0 bg-transparent',
};

/**
 * 小さなラベル/タグ。section eyebrow（label-en）や状態印（kin/bengara）に使う矩形バッジ。
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'kin', dot, className = '', children, ...rest },
  ref,
) {
  const dotColor = variant === 'bengara' ? 'bg-bengara-text' : 'bg-kin';
  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-1.5 rounded-btn leading-none align-middle ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {dot ? <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" /> : null}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
