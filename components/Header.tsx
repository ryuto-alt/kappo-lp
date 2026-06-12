import { useCallback, useEffect, useRef, useState } from 'react';
import { linkUnderline } from './primitives';

/** メニュー項目1件（和文ラベル + 欧文補助 + アンカー） */
export interface NavItem {
  /** 遷移先（#id 等） */
  href: string;
  /** 和文ラベル（例: 志） */
  label: string;
  /** 欧文補助ラベル（例: Concept） */
  en: string;
}

/** Headerコンポーネントのprops */
export interface HeaderProps {
  /** ナビゲーション項目（既定値あり） */
  items?: NavItem[];
  /** 電話番号（表示・tel: 双方） */
  tel?: string;
  /** ロゴ和文（既定: 沙羅雙樹） */
  brand?: string;
  /** ロゴ欧文（既定: Sarasōju） */
  brandEn?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { href: '#concept', label: '志', en: 'Concept' },
  { href: '#course', label: '献立', en: 'Course' },
  { href: '#shun', label: '旬の一品', en: 'Season' },
  { href: '#room', label: '設え', en: 'Rooms' },
  { href: '#access', label: '店案内', en: 'Access' },
];

/** ハンバーガー（メニューを開く）— inline SVG */
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** 閉じる（X）— inline SVG */
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * 固定ヘッダー。スクロール40px超で漆黒地＋燻し金罫が灯る。
 * lg未満はフォーカストラップ付きの全画面モバイルメニューを開閉する。
 */
export function Header({
  items = DEFAULT_ITEMS,
  tel = '075-771-0000',
  brand = '沙羅雙樹',
  brandEn = 'Sarasōju',
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const telHref = `tel:${tel.replace(/[^0-9]/g, '')}`;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // topbar背景: スクロール40px超
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    toggleRef.current?.focus();
  }, []);

  // body スクロールロック + Esc/Tabトラップ
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null,
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div
        className={`transition-all duration-300 border-b ${
          scrolled
            ? 'bg-sumi/[0.92] backdrop-blur-md border-kin/20'
            : 'border-transparent'
        }`}
      >
        <nav
          className="max-w-container mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between"
          aria-label="メインナビゲーション"
        >
          <a href="#hero" className="flex items-baseline gap-2 group">
            <span className="display text-kinari text-[1.4rem] tracking-[0.12em] leading-none">{brand}</span>
            <span className="font-latin italic text-kin tracking-[0.04em] text-[0.7rem] hidden sm:inline">{brandEn}</span>
          </a>

          <ul className="hidden lg:flex items-center gap-9 text-[0.86rem] text-tint tracking-[0.06em]">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`${linkUnderline} hover:text-kinari`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 md:gap-3">
            <a
              href={telHref}
              className={`hidden md:inline-flex items-center min-h-[44px] text-tint text-[0.8rem] tracking-[0.08em] hover:text-kinari ${linkUnderline}`}
            >
              {tel}
            </a>
            <a
              href="#reserve"
              className="btn-bengara bg-btn-bengara text-btn-bengara-text border border-[rgba(244,238,226,0.16)] font-medium rounded-btn min-h-[44px] inline-flex items-center justify-center text-[0.78rem] md:text-[0.82rem] tracking-[0.1em] px-4 md:px-5 py-3 hover:bg-btn-bengara-hover focus-visible:bg-btn-bengara-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
            >
              ご予約
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-11 h-11 grid place-items-center text-kinari focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kin"
              aria-label="メニューを開く"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      <div
        id="mobileMenu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="ナビゲーション"
        className={`lg:hidden fixed inset-0 z-50 bg-sumi/[0.97] backdrop-blur-sm flex-col ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-kin/20">
          <span className="display text-kinari text-[1.4rem] tracking-[0.12em]">{brand}</span>
          <button
            type="button"
            onClick={closeMenu}
            className="w-11 h-11 grid place-items-center text-kinari focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kin"
            aria-label="メニューを閉じる"
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-7 pt-8 text-2xl display tracking-[0.1em]">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="block py-3 border-b border-tint/15 text-kinari"
              >
                {item.label}{' '}
                <span className="font-latin italic text-kin tracking-[0.04em] text-sm align-middle ml-2">
                  {item.en}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="px-7 mt-auto pb-10 space-y-3">
          <a
            href="#reserve"
            onClick={closeMenu}
            className="btn-bengara bg-btn-bengara text-btn-bengara-text border border-[rgba(244,238,226,0.16)] font-medium rounded-btn block text-center py-4 tracking-[0.15em] text-[0.95rem] hover:bg-btn-bengara-hover focus-visible:bg-btn-bengara-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
          >
            ご予約・お問い合わせ
          </a>
          <a
            href={telHref}
            className="block text-center text-tint tracking-[0.1em] num text-xl min-h-[44px] inline-flex items-center justify-center w-full"
          >
            {tel}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
