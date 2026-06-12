import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

/** Inputコンポーネントのprops */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** フィールド上部のラベル文言 */
  label?: ReactNode;
  /** 必須印（朱の `*`）を表示するか */
  requiredMark?: boolean;
  /** ラベル下・入力欄下に出す補助説明 */
  hint?: ReactNode;
  /** エラーメッセージ（指定時は枠を朱に、aria-invalidを付与） */
  error?: ReactNode;
}

/** 漆黒地・燻し金枠・矩形のフォーム入力共通スタイル（hover/focusで枠が灯る） */
const controlClass =
  'w-full bg-sumi text-kinari font-body font-light text-[0.98rem] rounded-btn ' +
  'px-[0.9rem] py-[0.7rem] min-h-[48px] ' +
  'border border-[rgba(182,146,92,0.30)] ' +
  'placeholder:text-tint-muted ' +
  'transition-[border-color,box-shadow] duration-200 ease-out ' +
  'hover:border-[rgba(182,146,92,0.55)] ' +
  'focus:outline-none focus-visible:outline-none focus:border-kin focus-visible:border-kin ' +
  'focus:shadow-[0_0_0_2px_rgba(182,146,92,0.22)] focus-visible:shadow-[0_0_0_2px_rgba(182,146,92,0.22)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

/**
 * ラベル付きテキスト入力。label/hint/error と input を id・aria で結線する。
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, requiredMark, hint, error, className = '', id, required, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2.5">
      {label ? (
        <label htmlFor={inputId} className="text-kinari text-[0.84rem] tracking-[0.06em] font-body">
          {label}
          {(requiredMark ?? required) ? <span className="text-bengara-text"> *</span> : null}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${controlClass} ${error ? 'border-bengara-text hover:border-bengara-text focus:border-bengara-text' : ''} ${className}`}
        {...rest}
      />
      {hint ? <p id={hintId} className="text-note text-[0.82rem] leading-[1.78]">{hint}</p> : null}
      {error ? <p id={errorId} className="text-bengara-text text-[0.82rem] leading-[1.78]" role="alert">{error}</p> : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
