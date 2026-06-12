import { useEffect, useState } from 'react';

/** ReserveBarコンポーネントのprops */
export interface ReserveBarProps {
  /** 電話番号 */
  tel?: string;
  /** 表示し始めるスクロール量(px)（既定: 240） */
  showAfter?: number;
}

/** 電話 — inline SVG */
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/**
 * 画面下に固定する予約バー。スクロールが showAfter を超えると
 * 下からせり上がり、夜コースの要点と電話/予約CTAを提示する。
 */
export function ReserveBar({ tel = '075-771-0000', showAfter = 240 }: ReserveBarProps) {
  const [show, setShow] = useState(false);
  const telHref = `tel:${tel.replace(/[^0-9]/g, '')}`;

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > showAfter);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 bg-tan/95 backdrop-blur-md border-t border-bengara/40 transition-transform duration-[420ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(110%)',
        boxShadow: '0 -1px 0 rgba(182,146,92,0.35), 0 -18px 40px rgba(0,0,0,0.55)',
      }}
    >
      <div className="max-w-container mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="display text-kinari text-[0.98rem] tracking-[0.06em] leading-tight">
            夜のおまかせ「宵」
            <span className="num text-kin ml-2">
              <span className="yen">¥</span>22,000
            </span>
          </p>
          <p className="text-tint text-[0.74rem]">月・火・木・金・土 18:00 一斉 ・ 完全予約制</p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <a
            href={telHref}
            className="btn-ghost border border-[rgba(182,146,92,0.45)] text-kinari rounded-btn min-h-[44px] flex-1 sm:flex-none px-5 py-3 text-center text-[0.86rem] tracking-[0.08em] inline-flex items-center justify-center gap-2 hover:border-kin hover:bg-[rgba(182,146,92,0.08)] focus-visible:border-kin focus-visible:bg-[rgba(182,146,92,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
          >
            <PhoneIcon />
            <span className="sm:hidden">電話</span>
            <span className="hidden sm:inline">お電話</span>
          </a>
          <a
            href="#reserve"
            className="btn-bengara bg-btn-bengara text-btn-bengara-text border border-[rgba(244,238,226,0.16)] font-medium rounded-btn min-h-[44px] flex-1 sm:flex-none px-6 py-3 text-center text-[0.86rem] tracking-[0.1em] inline-flex items-center justify-center hover:bg-btn-bengara-hover focus-visible:bg-btn-bengara-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
          >
            ご予約
          </a>
        </div>
      </div>
    </div>
  );
}

export default ReserveBar;
