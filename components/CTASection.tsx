import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eyebrow, Reveal, GrainOverlay } from './primitives';
import { Input } from './Input';
import { Select } from './Select';

/** CTASection（予約）コンポーネントのprops */
export interface CTASectionProps {
  /** 電話番号（表示・tel:） */
  tel?: string;
  /** 予約受付メールアドレス */
  email?: string;
  /** 仮予約送信時のハンドラ（未指定なら既定の受付メッセージを表示） */
  onSubmit?: (data: FormData) => void;
}

/** 右向き矢印 — inline SVG */
function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** 電話 — inline SVG */
function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/** メール — inline SVG */
function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

/** マイナス — inline SVG */
function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

/** プラス — inline SVG */
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const MIN_GUESTS = 1;
const MAX_GUESTS = 8;

/**
 * 予約セクション。見出し・リードに続き、仮予約フォーム
 * （日付・時間帯・人数ステッパー・コース選択・備考・連絡先）を備える。
 * 送信時は HTML5 バリデーション後に受付メッセージを aria-live で告知。
 */
export function CTASection({
  tel = '075-771-0000',
  email = 'reserve@sarasoju-kyoto.jp',
  onSubmit,
}: CTASectionProps) {
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const telHref = `tel:${tel.replace(/[^0-9]/g, '')}`;

  const clamp = (n: number) => Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, n));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    onSubmit?.(new FormData(form));
    setSubmitted(true);
  };

  return (
    <section
      id="reserve"
      aria-labelledby="reserve-h"
      className="relative py-[100px] md:py-[150px] overflow-hidden"
    >
      <GrainOverlay />
      <div
        className="ambient-fade pointer-events-none absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[55vw] aspect-square motion-reduce:animate-none"
        style={{
          animation: 'breathe 14s ease-in-out infinite',
          background:
            'radial-gradient(circle at center, rgba(158,59,46,0.13) 0%, rgba(182,146,92,0.05) 40%, transparent 65%)',
        }}
      />

      <div className="max-w-container-narrow mx-auto px-5 md:px-10">
        <div className="text-center max-w-[640px] mx-auto">
          <Reveal>
            <Eyebrow className="text-[1rem] mb-6">Reservations</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2
              id="reserve-h"
              className="display text-kinari leading-[1.3] tracking-[0.07em] mb-7"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 500 }}
            >
              特別な夜を、<br />ご一緒に。
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="lede text-tint text-[1.0rem] max-w-[36ch] mx-auto mb-14">
              下記フォーム、またはお電話・メールにて承ります。仮予約として承り、当店より確認のご連絡を差し上げます。
            </p>
          </Reveal>
        </div>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-describedby="reserve-note"
            className="panel bg-tan border border-[rgba(182,146,92,0.12)] rounded-card p-7 md:p-12 text-left"
          >
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              <Input
                label="ご来店日"
                requiredMark
                required
                type="date"
                id="r-date"
                name="date"
              />

              <Select
                label="時間帯"
                requiredMark
                required
                id="r-time"
                name="time"
                placeholder="お選びください"
                options={[
                  { value: 'lunch-1200', label: '昼 12:00（木〜日）' },
                  { value: 'lunch-1330', label: '昼 13:30（木〜日）' },
                  { value: 'dinner-1800', label: '夜 18:00 一斉（月・火・木・金・土）' },
                ]}
              />

              {/* 人数 stepper */}
              <div className="flex flex-col gap-2.5">
                <span className="text-kinari text-[0.84rem] tracking-[0.06em]" id="r-guests-label">
                  ご人数 <span className="text-bengara-text">*</span>
                </span>
                <div
                  className="inline-flex items-stretch border border-[rgba(182,146,92,0.30)] self-start"
                  role="group"
                  aria-labelledby="r-guests-label"
                >
                  <button
                    type="button"
                    onClick={() => setGuests((g) => clamp(g - 1))}
                    disabled={guests <= MIN_GUESTS}
                    aria-label="人数を減らす"
                    className="w-12 min-h-[48px] grid place-items-center text-kinari bg-sumi hover:bg-[rgba(182,146,92,0.10)] hover:text-kin focus-visible:bg-[rgba(182,146,92,0.10)] focus-visible:text-kin disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-kin"
                  >
                    <MinusIcon />
                  </button>
                  <output
                    aria-live="polite"
                    className="min-w-[56px] grid place-items-center num text-[1.2rem] text-kinari border-x border-[rgba(182,146,92,0.30)]"
                  >
                    {guests}
                  </output>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => clamp(g + 1))}
                    disabled={guests >= MAX_GUESTS}
                    aria-label="人数を増やす"
                    className="w-12 min-h-[48px] grid place-items-center text-kinari bg-sumi hover:bg-[rgba(182,146,92,0.10)] hover:text-kin focus-visible:bg-[rgba(182,146,92,0.10)] focus-visible:text-kin disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-kin"
                  >
                    <PlusIcon />
                  </button>
                  <span className="self-center pl-4 text-tint text-[0.86rem]">名様（中学生以上）</span>
                </div>
                <input type="hidden" name="guests" value={guests} />
              </div>

              {/* コース選択 ラジオ */}
              <fieldset className="flex flex-col gap-2.5 sm:col-span-2">
                <legend className="text-kinari text-[0.84rem] tracking-[0.06em] mb-0.5">
                  ご希望のコース <span className="text-bengara-text">*</span>
                </legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="radio-card relative cursor-pointer">
                    <input type="radio" name="course" value="lunch" className="peer absolute opacity-0 inset-0 cursor-pointer" />
                    <span className="radio-face flex items-baseline justify-between gap-2 border border-[rgba(182,146,92,0.30)] px-4 py-[0.9rem] transition-[border-color,background-color] duration-200 peer-hover:border-[rgba(182,146,92,0.55)] peer-checked:border-kin peer-checked:bg-[rgba(182,146,92,0.06)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kin">
                      <span className="text-kinari text-[0.96rem]">
                        昼の献立「水無月」
                        <span className="block text-tint text-[0.8rem] mt-0.5">全六品 ・ 90分</span>
                      </span>
                      <span className="num text-kin text-[1.1rem]">
                        <span className="yen">¥</span>8,800
                      </span>
                    </span>
                  </label>
                  <label className="radio-card relative cursor-pointer">
                    <input type="radio" name="course" value="dinner" defaultChecked className="peer absolute opacity-0 inset-0 cursor-pointer" />
                    <span className="radio-face flex items-baseline justify-between gap-2 border border-[rgba(182,146,92,0.30)] px-4 py-[0.9rem] transition-[border-color,background-color] duration-200 peer-hover:border-[rgba(182,146,92,0.55)] peer-checked:border-kin peer-checked:bg-[rgba(182,146,92,0.06)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kin">
                      <span className="text-kinari text-[0.96rem]">
                        夜のおまかせ「宵」
                        <span className="block text-tint text-[0.8rem] mt-0.5">全十品 ・ 約150分</span>
                      </span>
                      <span className="num text-kin text-[1.1rem]">
                        <span className="yen">¥</span>22,000
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>

              {/* 用途/アレルギー */}
              <div className="flex flex-col gap-2.5 sm:col-span-2">
                <label htmlFor="r-notes" className="text-kinari text-[0.84rem] tracking-[0.06em]">
                  ご用途・アレルギー・苦手食材など
                </label>
                <textarea
                  id="r-notes"
                  name="notes"
                  placeholder="例）父の還暦祝いです。甲殻類のアレルギーがございます。個室を希望します。"
                  className="w-full bg-sumi text-kinari font-body font-light text-[0.98rem] rounded-btn px-[0.9rem] py-[0.7rem] min-h-[96px] resize-y leading-[1.7] border border-[rgba(182,146,92,0.30)] placeholder:text-tint-muted transition-[border-color,box-shadow] duration-200 hover:border-[rgba(182,146,92,0.55)] focus:outline-none focus:border-kin focus:shadow-[0_0_0_2px_rgba(182,146,92,0.22)]"
                />
              </div>

              <Input label="お名前" requiredMark required type="text" id="r-name" name="name" autoComplete="name" placeholder="山田 花子" />
              <Input label="お電話番号" requiredMark required type="tel" id="r-tel" name="tel" autoComplete="tel" inputMode="tel" placeholder="090-1234-5678" />
              <div className="sm:col-span-2">
                <Input label="メールアドレス" requiredMark required type="email" id="r-email" name="email" autoComplete="email" placeholder="hanako@example.com" />
              </div>
            </div>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
              <button
                type="submit"
                className="btn-bengara bg-btn-bengara text-btn-bengara-text border border-[rgba(244,238,226,0.16)] font-medium rounded-btn min-h-[44px] px-10 py-4 tracking-[0.1em] text-[0.98rem] inline-flex items-center justify-center gap-3 w-full sm:w-auto hover:bg-btn-bengara-hover focus-visible:bg-btn-bengara-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
              >
                仮予約を申し込む
                <ArrowRightIcon />
              </button>
              <p id="reserve-note" className="text-note text-[0.82rem] leading-[1.78]">
                この時点では予約は確定しません。当店より確認後に成立します。
                <br className="hidden sm:block" />
                ご予約は前日まで。キャンセルは2日前まで無料、以降は規定の料金を申し受けます。
              </p>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={`text-kin text-[0.9rem] mt-5 ${submitted ? '' : 'hidden'}`}
            >
              お申し込みを受け付けました。確認のご連絡まで今しばらくお待ちください。
            </p>
          </form>
        </Reveal>

        {/* 電話・メール導線 */}
        <Reveal className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <p className="text-tint text-[0.86rem] tracking-[0.04em]">
            お急ぎの方・受付時間内（11:00–20:00）は
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={telHref}
              className="btn-ghost border border-[rgba(182,146,92,0.45)] text-kinari rounded-btn min-h-[44px] px-6 py-3 tracking-[0.08em] text-[0.9rem] inline-flex items-center justify-center gap-2.5 hover:border-kin hover:bg-[rgba(182,146,92,0.08)] focus-visible:border-kin focus-visible:bg-[rgba(182,146,92,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
            >
              <PhoneIcon />
              {tel}
            </a>
            <a
              href={`mailto:${email}`}
              className="btn-ghost border border-[rgba(182,146,92,0.45)] text-kinari rounded-btn min-h-[44px] px-6 py-3 tracking-[0.08em] text-[0.9rem] inline-flex items-center justify-center gap-2.5 hover:border-kin hover:bg-[rgba(182,146,92,0.08)] focus-visible:border-kin focus-visible:bg-[rgba(182,146,92,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-kin"
            >
              <MailIcon />
              メール
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CTASection;
