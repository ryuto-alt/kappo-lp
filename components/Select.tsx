import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';

/** Selectの選択肢1件 */
export interface SelectOption {
  /** option の value 値 */
  value: string;
  /** 表示ラベル */
  label: string;
  /** 選択不可にするか */
  disabled?: boolean;
}

/** Selectコンポーネントのprops */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** フィールド上部のラベル文言 */
  label?: ReactNode;
  /** 必須印（朱の `*`）を表示するか */
  requiredMark?: boolean;
  /** ラベル下・入力欄下に出す補助説明 */
  hint?: ReactNode;
  /** エラーメッセージ（指定時は枠を朱に、aria-invalidを付与） */
  error?: ReactNode;
  /** option配列で選択肢を渡す場合（children併用可） */
  options?: SelectOption[];
  /** 先頭に置くプレースホルダ option の文言（value=""） */
  placeholder?: string;
}

/** 燻し金の下向きシェブロンを背景画像として埋め込んだ data URL */
const CHEVRON_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23B6925C' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

/** appearance-none + 自前シェブロン + 漆黒地・燻し金枠の共通スタイル */
const controlClass =
  'w-full bg-sumi text-kinari font-body font-light text-[0.98rem] rounded-btn appearance-none ' +
  'pl-[0.9rem] pr-[2.4rem] py-[0.7rem] min-h-[48px] ' +
  'border border-[rgba(182,146,92,0.30)] ' +
  'transition-[border-color,box-shadow] duration-200 ease-out ' +
  'hover:border-[rgba(182,146,92,0.55)] ' +
  'focus:outline-none focus-visible:outline-none focus:border-kin focus-visible:border-kin ' +
  'focus:shadow-[0_0_0_2px_rgba(182,146,92,0.22)] focus-visible:shadow-[0_0_0_2px_rgba(182,146,92,0.22)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

/**
 * ラベル付きセレクト。ネイティブ矢印を消し燻し金シェブロンを右端に描画する。
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, requiredMark, hint, error, options, placeholder, className = '', id, required, children, style, ...rest },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2.5">
      {label ? (
        <label htmlFor={selectId} className="text-kinari text-[0.84rem] tracking-[0.06em] font-body">
          {label}
          {(requiredMark ?? required) ? <span className="text-bengara-text"> *</span> : null}
        </label>
      ) : null}
      <select
        ref={ref}
        id={selectId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${controlClass} ${error ? 'border-bengara-text hover:border-bengara-text focus:border-bengara-text' : ''} ${className}`}
        style={{
          backgroundImage: CHEVRON_BG,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.9rem center',
          ...style,
        }}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
      {hint ? <p id={hintId} className="text-note text-[0.82rem] leading-[1.78]">{hint}</p> : null}
      {error ? <p id={errorId} className="text-bengara-text text-[0.82rem] leading-[1.78]" role="alert">{error}</p> : null}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
