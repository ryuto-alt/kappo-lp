import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';

/* ============================================================
   割烹 沙羅雙樹 — セクション共通プリミティブ / フック
   proto-b.html の .stage-rule / .spotlight / .grain / .reveal /
   .link-underline 等を React 化したもの。pure Tailwind + inline style。
   ============================================================ */

/** SVGノイズを overlay で薄く重ねるフィルム質感オーバーレイ（proto .grain） */
export function GrainOverlay() {
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

/** 上下フェードする縦1pxの燻し金ヘアライン（舞台の幕）のprops */
export interface StageRuleProps {
  /** 横位置（例: '16%', '50%', '84%'） */
  left?: string;
  /** 横位置を右基準で指定する場合 */
  right?: string;
  /** 透明度の上書き（中央罫線は 0.9 等） */
  opacity?: number;
  /** ブレークポイント可視クラス（既定: lg以上で表示） */
  className?: string;
}

/** 舞台の幕を演出する縦罫線（proto .stage-rule） */
export function StageRule({ left, right, opacity, className = 'hidden lg:block' }: StageRuleProps) {
  const style: CSSProperties = {
    left,
    right,
    opacity,
    background:
      'linear-gradient(to bottom, transparent, rgba(182,146,92,0) 4%, rgba(182,146,92,0.32) 22%, rgba(182,146,92,0.32) 78%, rgba(182,146,92,0) 96%, transparent)',
  };
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 bottom-0 w-px ${className}`}
      style={style}
    />
  );
}

/** 欧文 eyebrow ラベル（EB Garamond italic / 燻し金）のprops */
export interface EyebrowProps {
  /** 表示文言 */
  children: ReactNode;
  /** 先頭に弁柄の短い罫を添えるか（heroで使用） */
  withRule?: boolean;
  /** 追加クラス */
  className?: string;
}

/** section eyebrow（proto .label-en）。任意で弁柄の短罫を先頭に置く。 */
export function Eyebrow({ children, withRule, className = '' }: EyebrowProps) {
  return (
    <p
      className={`font-latin italic text-kin tracking-[0.04em] ${withRule ? 'flex items-center gap-3' : ''} ${className}`}
    >
      {withRule ? <span className="inline-block w-8 h-px bg-bengara" aria-hidden="true" /> : null}
      {children}
    </p>
  );
}

/** スポットライト枠（暗がりに浮かぶ4/5の面）のprops */
export interface SpotlightProps {
  /** 中央に重ねる抽象皿などの子要素（inline SVG 等） */
  children?: ReactNode;
  /** 左下に表示する欧文ラベル */
  label?: ReactNode;
  /** 追加クラス */
  className?: string;
}

/** 料理を闇から灯すスポットライト枠（proto .spotlight + .grain） */
export function Spotlight({ children, label, className = '' }: SpotlightProps) {
  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-card border border-[rgba(182,146,92,0.14)] ${className}`}
      style={{
        background:
          'radial-gradient(120% 90% at 50% 38%, rgba(232,222,207,0.10) 0%, rgba(182,146,92,0.06) 26%, rgba(33,28,24,0.7) 58%, #14110F 100%), #211C18',
      }}
    >
      <GrainOverlay />
      {/* 中央上の生成り光 + 下端の闇（proto .spotlight::after） */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 42% at 50% 36%, rgba(232,222,207,0.14), transparent 70%), linear-gradient(to bottom, rgba(20,17,15,0) 58%, rgba(20,17,15,0.55) 100%)',
        }}
      />
      {children}
      {label ? (
        <span className="absolute z-[2] bottom-4 left-4 font-latin italic text-kin tracking-[0.04em] text-[0.8rem]">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/**
 * IntersectionObserver でスクロール出現（22px下から立ち上がる）を制御するフック。
 * prefers-reduced-motion 時は即時表示。delayMs で発火を遅延。
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setShown(true), delayMs);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);

  return { ref, shown };
}

/** reveal出現アニメーションを内包するラッパーのprops */
export interface RevealProps {
  /** 出現遅延(ms) */
  delay?: number;
  /** ラップ要素のタグ（既定: div） */
  as?: 'div' | 'section' | 'article' | 'li' | 'p';
  /** 追加クラス */
  className?: string;
  /** 内容 */
  children?: ReactNode;
}

/** スクロールで下からフェードインするラッパー（proto .reveal） */
export function Reveal({ delay = 0, as = 'div', className = '', children }: RevealProps) {
  const { ref, shown } = useReveal<HTMLElement>(delay);
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.2,.6,.2,1)] motion-reduce:transition-none ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[22px]'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** 左から伸びる燻し金1pxの下線リンク用クラス（proto .link-underline 相当） */
export const linkUnderline =
  'relative after:content-[""] after:absolute after:left-0 after:-bottom-[3px] after:h-px after:w-full ' +
  'after:bg-kin after:origin-left after:scale-x-0 after:transition-transform after:duration-[280ms] ' +
  'hover:after:scale-x-100 focus-visible:after:scale-x-100';
