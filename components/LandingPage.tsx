import { Header } from './Header';
import { Hero } from './Hero';
import { FeatureSection } from './FeatureSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';
import { ReserveBar } from './ReserveBar';

/** その日の献立 — inline SVG（八角の星） */
function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B6925C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.5-.5z" />
    </svg>
  );
}

/** 一番出汁 — inline SVG（波線） */
function BrothIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B6925C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h7l2-4 3 8 2-4h4" />
    </svg>
  );
}

/** 前日相談 — inline SVG（時計） */
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B6925C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/**
 * 主要セクションを組み上げた LP の参照実装。
 * Header / Hero / FeatureSection（味の劇場）/ CTASection（予約）/ Footer /
 * ReserveBar を最終デザインの順序で配置する。
 */
export function LandingPage() {
  return (
    <div className="font-feat">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:bg-tan focus:text-kinari focus:px-4 focus:py-2"
      >
        本文へスキップ
      </a>

      <Header />

      <main id="main">
        <Hero />

        <FeatureSection
          id="spotlight"
          eyebrow="A Theatre of Taste"
          heading={
            <>
              暗がりに、<br />一皿だけが浮かぶ。
            </>
          }
          lede="照明はカウンターの手元と、皿の上にだけ。料理が運ばれるたび、その一皿が舞台の主役のように灯ります。余白の闇が、味と香りを際立たせる——目で愉しみ、舌で味わう、一夜限りの献立です。"
          items={[
            { icon: <SparkleIcon />, text: 'その日仕入れた魚と野菜だけで組む、献立は毎日変わります' },
            { icon: <BrothIcon />, text: '利尻昆布と本枯節の一番出汁を、椀ごとに引き直し' },
            { icon: <ClockIcon />, text: 'アレルギー・苦手食材は前日までにご相談を承ります' },
          ]}
        />

        <CTASection />
      </main>

      <Footer />
      <ReserveBar />
    </div>
  );
}

export default LandingPage;
