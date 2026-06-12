/**
 * 割烹 沙羅雙樹 — Tailwind Preset
 * 方向性: 漆黒弁柄 — ダーク没入シアター
 * proto-b.html の tailwind.config / :root トークンと完全一致。
 *
 * 使い方:
 *   // tailwind.config.js
 *   module.exports = { presets: [require('./tailwind.preset.js')], content: [...] };
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        sumi:            '#14110F', // 濡羽墨 base 60
        tan:             '#211C18', // 炭墨 panel 30
        tint:            '#A89A8B', // 本文用ティントグレー（AA確保）
        'tint-muted':    '#8C7F72', // 装飾ラベル専用
        bengara:         '#9E3B2E', // 弁柄 accent 10（意匠用）
        'bengara-text':  '#C75A4A', // 朱・テキスト用（墨地でAA）
        kin:             '#B6925C', // 燻し金 hairline
        kinari:          '#E8DECF', // 生成り body text
        // CTAボタン専用
        'btn-bengara':       '#B04434',
        'btn-bengara-hover': '#9E3B2E',
        'btn-bengara-text':  '#F4EEE2',
        // 補助
        note:   '#9A8C7D',
        'map-bg': '#1B1714',
      },

      fontFamily: {
        mincho:   ['"Zen Old Mincho"', 'serif'],
        gothic:   ['"Zen Kaku Gothic New"', 'sans-serif'],
        garamond: ['"EB Garamond"', 'serif'],
        cormorant:['"Cormorant"', 'serif'],
        // セマンティック別名
        display:  ['"Zen Old Mincho"', 'serif'],
        body:     ['"Zen Kaku Gothic New"', 'sans-serif'],
        latin:    ['"EB Garamond"', 'serif'],
        num:      ['"Cormorant"', 'serif'],
      },

      borderRadius: {
        card: '2px',
        btn:  '0px',
      },

      boxShadow: {
        'reserve-bar': '0 -1px 0 rgba(182,146,92,0.35), 0 -18px 40px rgba(0,0,0,0.55)',
        'focus-ring':  '0 0 0 2px rgba(182,146,92,0.22)',
      },

      spacing: {
        // 4 / 8 scale（Tailwind既定外の補完値）
        1:  '4px',
        2:  '8px',
        3:  '12px',
        4:  '16px',
        6:  '24px',
        8:  '32px',
        12: '48px',
        16: '64px',
        24: '96px',  // セクション縦余白(モバイル)
        32: '128px',
        40: '160px', // セクション縦余白(デスクトップ)
      },

      maxWidth: {
        container:        '1280px',
        'container-mid':  '1180px',
        'container-narrow': '920px',
      },

      lineHeight: {
        body:    '1.72',
        lede:    '1.78',
        display: '1.18',
      },

      letterSpacing: {
        label:   '0.06em',
        display: '0.08em',
        scroll:  '0.30em',
      },

      transitionTimingFunction: {
        standard: 'cubic-bezier(.2,.6,.2,1)',
        bar:      'cubic-bezier(.2,.7,.2,1)',
      },

      transitionDuration: {
        link:   '280ms',
        reveal: '900ms',
        bar:    '420ms',
      },
    },
  },
};
