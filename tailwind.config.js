/** @type {import('tailwindcss').Config} */

/* Palette is driven by the CSS custom properties in app/globals.css.
   Because the tokens themselves swap under `.dark`, utilities like
   `bg-paper` / `text-ink` are already theme-aware — components do not need
   `dark:` variants (or isDarkMode ternaries) for core surfaces and text. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: token('paper'),
          sunk: token('paper-sunk'),
          raised: token('paper-raised'),
        },
        ink: {
          DEFAULT: token('ink'),
          muted: token('ink-muted'),
          faint: token('ink-faint'),
        },
        rule: token('rule'),
        clay: {
          DEFAULT: token('clay'),
          deep: token('clay-deep'),
        },
      },

      fontFamily: {
        // Archivo carries display duty; it has a variable width axis that
        // gives headlines real presence without a decorative face.
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },

      fontSize: {
        // Institutional display scale — deliberately large jumps so the
        // hierarchy reads at a glance.
        'display-sm': ['clamp(2rem, 5vw, 2.75rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.5rem, 7vw, 4.25rem)', { lineHeight: '1.0', letterSpacing: '-0.034em' }],
        'display-lg': ['clamp(3rem, 10vw, 6.5rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
      },

      maxWidth: {
        shell: 'var(--shell)',
        measure: '38rem', // comfortable reading column
      },

      spacing: {
        header: 'var(--header-h)',
        section: 'clamp(5rem, 12vh, 9rem)', // vertical section rhythm
      },

      borderRadius: {
        // Institutional geometry: near-square. No pill/blob shapes.
        DEFAULT: '2px',
        sm: '1px',
        md: '3px',
        lg: '4px',
      },

      transitionTimingFunction: {
        // One shared easing for the whole system.
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      keyframes: {
        // Text mask reveal — the only ambient motion in the system.
        rise: {
          from: { transform: 'translateY(105%)' },
          to: { transform: 'translateY(0)' },
        },
        'rule-draw': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },

      animation: {
        rise: 'rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'rule-draw': 'rule-draw 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  // No daisyUI: it ships its own themed button/input/card layer plus a
  // competing CSS-variable palette, which fights this design system.
  // No typography plugin: there is no long-form prose on the site.
  plugins: [],
};
