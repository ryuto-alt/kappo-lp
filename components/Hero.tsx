import { Eyebrow, Reveal, StageRule, GrainOverlay, linkUnderline } from './primitives';

/** Heroコンポーネントのprops */
export interface HeroProps {
  /** 欧文 eyebrow（既定: 店名・所在） */
  eyebrow?: string;
  /** 補助コピー（改行は配列で渡す） */
  lede?: string[];
}

/** 右向き矢印 — inline SVG */
function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const DEFAULT_LEDE = [
  '東山の路地裏、八席の白木のカウンター。',
  '旬を一皿に閉じ込め、静かに供する一夜。',
  '記念日に、会食に、もてなしの席に。',
];

/**
 * ヒーロー。漆黒地に呼吸するラジアルグローと縦罫の舞台幕を敷き、
 * 大見出し・補助コピー・CTA2種を段階的に reveal する。
 */
export function Hero({
  eyebrow = 'Kappo Sarasōju ・ Kyoto Higashiyama',
  lede = DEFAULT_LEDE,
}: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <GrainOverlay />

      {/* ambient radial spotlight（呼吸するグロー） */}
      <div
        className="ambient-fade pointer-events-none absolute -z-10 left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[70vw] aspect-square motion-reduce:animate-none"
        style={{
          animation: 'breathe 14s ease-in-out infinite',
          background:
            'radial-gradient(circle at center, rgba(182,146,92,0.16) 0%, rgba(158,59,46,0.07) 32%, transparent 62%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(140% 120% at 50% 120%, rgba(0,0,0,0), rgba(0,0,0,0.55))' }}
      />

      <StageRule left="16%" className="hidden md:block" />
      <StageRule left="84%" className="hidden md:block" />

      <div className="max-w-container mx-auto w-full px-5 md:px-10 pt-28 pb-24">
        <div className="max-w-[60ch] md:max-w-none">
          <Reveal as="div" className="mb-6">
            <Eyebrow withRule className="text-[0.95rem] md:text-[1.05rem]">
              {eyebrow}
            </Eyebrow>
          </Reveal>

          <Reveal delay={90}>
            <h1
              className="display text-kinari leading-[1.18] tracking-[0.08em]"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 500 }}
            >
              夜の帳が下りるころ、<br className="hidden sm:block" />
              <span className="text-kin">一椀</span>が灯る。
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="lede mt-8 text-kinari/90 text-[1.02rem] md:text-[1.12rem] max-w-[40ch]">
              {lede.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < lede.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal
            delay={270}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
          >
            <a
              href="#reserve"
              className="btn-bengara bg-btn-bengara text-btn-bengara-text border border-[rgba(244,238,226,0.16)] font-medium rounded-btn min-h-[44px] px-8 py-4 text-center tracking-[0.14em] text-[0.95rem] inline-flex items-center justify-center gap-2 hover:bg-btn-bengara-hover focus-visible:bg-btn-bengara-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
            >
              ご予約・お問い合わせ
              <ArrowRightIcon />
            </a>
            <a
              href="#course"
              className="btn-ghost border border-[rgba(182,146,92,0.45)] text-kinari rounded-btn min-h-[44px] px-8 py-4 text-center tracking-[0.14em] text-[0.95rem] inline-flex items-center justify-center hover:border-kin hover:bg-[rgba(182,146,92,0.08)] focus-visible:border-kin focus-visible:bg-[rgba(182,146,92,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
            >
              献立を見る
            </a>
            <a
              href="#access"
              className={`min-h-[44px] inline-flex items-center justify-center sm:justify-start text-tint text-[0.9rem] tracking-[0.08em] hover:text-kinari ${linkUnderline}`}
            >
              店へのご案内
            </a>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <Reveal className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-tint">
        <span className="tate text-[0.66rem] tracking-[0.3em]">SCROLL</span>
        <span className="w-px h-10 bg-gradient-to-b from-kin/60 to-transparent" />
      </Reveal>
    </section>
  );
}

export default Hero;
