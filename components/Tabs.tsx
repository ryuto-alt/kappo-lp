import { forwardRef, useId, useRef, useState, useCallback } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';

/** タブ1件の定義 */
export interface TabItem {
  /** 一意なタブID（value） */
  id: string;
  /** タブ見出し（和文ディスプレイ等） */
  label: ReactNode;
  /** 任意の補足（欧文ラベルなど）。タブ見出し脇に小さく添える */
  eyebrow?: ReactNode;
  /** パネル本文 */
  content: ReactNode;
  /** 無効化 */
  disabled?: boolean;
}

/** Tabsコンポーネントのprops */
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** タブ群 */
  items: TabItem[];
  /** 初期選択タブID（非制御時） */
  defaultTabId?: string;
  /** 選択中タブID（制御時） */
  activeTabId?: string;
  /** 選択変更時のコールバック */
  onTabChange?: (id: string) => void;
  /** タブリストのアクセシブル名 */
  ariaLabel?: string;
}

/** タブボタンの状態別スタイル（燻し金の下線が左から伸びる選択演出） */
function tabClass(active: boolean, disabled?: boolean): string {
  return [
    'relative inline-flex flex-col items-start gap-0.5 px-1 pb-3 pt-1 min-h-[44px] font-display',
    'text-[1.05rem] tracking-[0.08em] rounded-btn',
    'transition-[color] duration-200 ease-out',
    'after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-kin',
    'after:origin-left after:transition-transform after:duration-[280ms] after:ease-out',
    active ? 'text-kinari after:scale-x-100' : 'text-tint after:scale-x-0',
    !disabled && !active ? 'hover:text-kinari focus-visible:text-kinari' : '',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin',
    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');
}

/**
 * ARIA準拠のタブ。矢印/Home/Endキーで移動、燻し金下線で選択を表す。制御・非制御両対応。
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, defaultTabId, activeTabId, onTabChange, ariaLabel = 'タブ', className = '', ...rest },
  ref,
) {
  const baseId = useId();
  const firstEnabled = items.find((t) => !t.disabled)?.id ?? items[0]?.id;
  const [internal, setInternal] = useState<string>(defaultTabId ?? firstEnabled);
  const current = activeTabId ?? internal;
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = useCallback(
    (id: string) => {
      if (activeTabId === undefined) setInternal(id);
      onTabChange?.(id);
    },
    [activeTabId, onTabChange],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const enabled = items.filter((t) => !t.disabled);
      const idx = enabled.findIndex((t) => t.id === current);
      if (idx === -1) return;
      let nextIdx: number | null = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (idx + 1) % enabled.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (idx - 1 + enabled.length) % enabled.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = enabled.length - 1;
      if (nextIdx === null) return;
      e.preventDefault();
      const nextId = enabled[nextIdx].id;
      select(nextId);
      tabRefs.current[nextId]?.focus();
    },
    [items, current, select],
  );

  return (
    <div ref={ref} className={className} {...rest}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap items-end gap-8 border-b border-[rgba(168,154,139,0.12)]"
      >
        {items.map((t) => {
          const active = t.id === current;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${t.id}`}
              tabIndex={active ? 0 : -1}
              disabled={t.disabled}
              onClick={() => !t.disabled && select(t.id)}
              onKeyDown={onKeyDown}
              className={tabClass(active, t.disabled)}
            >
              {t.eyebrow ? (
                <span className="font-latin italic text-kin text-[0.78rem] tracking-[0.04em] not-sr-only">
                  {t.eyebrow}
                </span>
              ) : null}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {items.map((t) => {
        const active = t.id === current;
        return (
          <div
            key={t.id}
            role="tabpanel"
            id={`${baseId}-panel-${t.id}`}
            aria-labelledby={`${baseId}-tab-${t.id}`}
            tabIndex={0}
            hidden={!active}
            className="pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
          >
            {active ? t.content : null}
          </div>
        );
      })}
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
