import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** ボタンの視覚バリアント: 弁柄CTA / ghost枠線 / 下線リンク調 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
/** ボタンの寸法: 小 / 中 / 大 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Buttonコンポーネントのprops */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 視覚バリアント（既定: primary） */
  variant?: ButtonVariant;
  /** 寸法（既定: md） */
  size?: ButtonSize;
  /** 先頭に表示するアイコン等の要素 */
  leadingIcon?: ReactNode;
  /** 末尾に表示するアイコン等の要素 */
  trailingIcon?: ReactNode;
}

/** 右向き矢印（CTA末尾の標準アイコン）— inline SVG */
function ArrowRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** バリアント別の地・枠・文字・状態スタイル（弁柄/ghost/下線調） */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-btn-bengara text-btn-bengara-text border border-[rgba(244,238,226,0.16)] font-medium hover:bg-btn-bengara-hover focus-visible:bg-btn-bengara-hover',
  secondary:
    'bg-transparent text-kinari border border-[rgba(182,146,92,0.45)] hover:border-kin hover:bg-[rgba(182,146,92,0.08)] focus-visible:border-kin focus-visible:bg-[rgba(182,146,92,0.08)]',
  ghost:
    'bg-transparent text-tint border-0 hover:text-kinari focus-visible:text-kinari',
};

/** 寸法別のパディング・最小高・字送り・文字サイズ */
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] px-5 py-3 text-[0.82rem] tracking-[0.1em] gap-2',
  md: 'min-h-[44px] px-8 py-4 text-[0.95rem] tracking-[0.14em] gap-2',
  lg: 'min-h-[48px] px-10 py-4 text-[0.98rem] tracking-[0.1em] gap-3',
};

/**
 * 漆黒弁柄テーマのボタン。矩形（角丸0）・燻し金focusリング・最小タップ44pxを満たす。
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', leadingIcon, trailingIcon, className = '', type, children, ...rest },
  ref,
) {
  const base =
    'inline-flex items-center justify-center rounded-btn font-body select-none ' +
    'transition-[color,background-color,border-color,opacity] duration-200 ease-[cubic-bezier(.2,.6,.2,1)] ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin ' +
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {leadingIcon ? <span className="shrink-0" aria-hidden="true">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="shrink-0" aria-hidden="true">{trailingIcon}</span> : null}
    </button>
  );
});

Button.displayName = 'Button';

export { ArrowRightIcon };
export default Button;
