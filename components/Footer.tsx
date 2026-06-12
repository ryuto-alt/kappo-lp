import { linkUnderline } from './primitives';

/** フッターのメニュー項目 */
export interface FooterLink {
  /** 遷移先 */
  href: string;
  /** ラベル */
  label: string;
}

/** Footerコンポーネントのprops */
export interface FooterProps {
  /** メニューリンク（既定値あり） */
  menu?: FooterLink[];
  /** 電話番号 */
  tel?: string;
  /** メールアドレス */
  email?: string;
  /** 住所 */
  address?: string;
  /** 著作権年 */
  year?: number;
}

const DEFAULT_MENU: FooterLink[] = [
  { href: '#concept', label: '志' },
  { href: '#course', label: '献立' },
  { href: '#shun', label: '旬の一品' },
  { href: '#room', label: '設え' },
  { href: '#access', label: '店案内' },
];

/**
 * フッター。店名・コピー・メニュー・連絡先（電話/住所/メール）と、
 * 著作権 + 規約リンクを燻し金の罫で区切って配置する。
 */
export function Footer({
  menu = DEFAULT_MENU,
  tel = '075-771-0000',
  email = 'reserve@sarasoju-kyoto.jp',
  address = '京都市東山区祇園町南側 570-12',
  year = 2026,
}: FooterProps) {
  const telHref = `tel:${tel.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="relative border-t border-kin/20 py-16 md:py-20">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="display text-kinari text-[1.6rem] tracking-[0.12em]">沙羅雙樹</span>
              <span className="font-latin italic text-kin tracking-[0.04em] text-[0.78rem]">Kappo Sarasōju</span>
            </div>
            <p className="lede text-tint text-[0.88rem] max-w-[34ch]">
              京・東山に灯る、八席の割烹。<br />
              一夜限りの献立で、ハレの日をしつらえます。
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="フッターナビゲーション">
            <p className="font-latin italic text-kin tracking-[0.04em] text-[0.78rem] mb-4">Menu</p>
            <ul className="text-[0.9rem] text-tint">
              {menu.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={`${linkUnderline} hover:text-kinari min-h-[44px] inline-flex items-center py-1`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-latin italic text-kin tracking-[0.04em] text-[0.78rem] mb-4">Contact</p>
            <a href={telHref} className={`num text-kinari text-[1.4rem] mb-1 hover:text-kin min-h-[44px] inline-flex items-center ${linkUnderline}`}>
              {tel}
            </a>
            <p className="text-tint text-[0.86rem] mb-4">受付 11:00–20:00</p>
            <p className="text-tint text-[0.86rem] leading-[1.78]">
              {address}<br />
              <a href={`mailto:${email}`} className={`${linkUnderline} hover:text-kinari min-h-[44px] inline-flex items-center py-1`}>
                {email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-tint/12 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[0.76rem] text-note tracking-[0.04em]">
          <p>© {year} Kappo Sarasōju. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <a href="#" className={`${linkUnderline} hover:text-kinari min-h-[44px] inline-flex items-center py-2`}>特定商取引法</a>
            </li>
            <li>
              <a href="#" className={`${linkUnderline} hover:text-kinari min-h-[44px] inline-flex items-center py-2`}>プライバシー</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
