import type { ReactNode } from 'react';
import { Eyebrow, Reveal, Spotlight } from './primitives';

/** 機能リスト1項目（アイコン + 本文） */
export interface FeatureItem {
  /** 行頭のアイコン（inline SVG など、18px想定） */
  icon: ReactNode;
  /** 本文 */
  text: ReactNode;
}

/** FeatureSectionコンポーネントのprops */
export interface FeatureSectionProps {
  /** セクションid（aria紐付け用） */
  id?: string;
  /** 欧文 eyebrow */
  eyebrow: string;
  /** 見出し（改行は ReactNode で渡す） */
  heading: ReactNode;
  /** 本文リード */
  lede: ReactNode;
  /** 機能リスト */
  items: FeatureItem[];
  /** スポットライト内に置く抽象皿などのビジュアル */
  visual?: ReactNode;
  /** スポットライト左下の欧文ラベル */
  visualLabel?: ReactNode;
}

/** 八寸（先付）の抽象皿 — inline SVG（既定ビジュアル） */
function DefaultDish() {
  return (
    <svg className="plate absolute left-1/2 top-[40%] w-[62%] aspect-square -translate-x-1/2 -translate-y-1/2" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <ellipse cx="100" cy="104" rx="92" ry="88" stroke="#B6925C" strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="100" cy="104" rx="70" ry="66" stroke="#B6925C" strokeWidth="0.8" opacity="0.5" />
      <path d="M62 110 Q100 70 138 110 Q100 130 62 110Z" fill="#9E3B2E" opacity="0.55" />
      <path d="M70 104 Q100 80 130 104" stroke="#E8DECF" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="104" r="6" fill="#E8DECF" opacity="0.6" />
      <path d="M86 120 q14 14 28 0" stroke="#B6925C" strokeWidth="1.2" opacity="0.7" />
      <circle cx="78" cy="92" r="2.2" fill="#B6925C" opacity="0.7" />
      <circle cx="124" cy="94" r="2.2" fill="#B6925C" opacity="0.7" />
    </svg>
  );
}

/**
 * スポットライト型のフィーチャーセクション。
 * 左に「闇から灯る一皿」、右に eyebrow・見出し・リード・機能リストを並べる。
 */
export function FeatureSection({
  id,
  eyebrow,
  heading,
  lede,
  items,
  visual,
  visualLabel = '先付 ・ Hassun',
}: FeatureSectionProps) {
  const labelledBy = id ? `${id}-h` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="relative py-[80px] md:py-[120px] overflow-hidden"
    >
      <div className="max-w-container mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <Reveal as="div" className="md:col-span-6 lg:col-span-5">
            <Spotlight label={visualLabel}>{visual ?? <DefaultDish />}</Spotlight>
          </Reveal>

          <Reveal as="div" className="md:col-span-6 lg:col-span-6 lg:col-start-7">
            <Eyebrow className="text-[0.95rem] mb-5">{eyebrow}</Eyebrow>
            <h2
              id={labelledBy}
              className="display text-kinari leading-[1.32] tracking-[0.06em] mb-7 h2-scale text-[clamp(2rem,4.4vw,3rem)] font-medium"
            >
              {heading}
            </h2>
            <p className="lede text-tint text-[1.0rem] md:text-[1.08rem] max-w-[38ch]">{lede}</p>

            <ul className="mt-9 space-y-4 text-[0.94rem]">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-kinari">
                  <span className="mt-1 shrink-0" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
