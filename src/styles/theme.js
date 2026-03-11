// ─────────────────────────────────────────────────────────────────────────────
// theme.js — all shared design tokens for the Snakefat Blog
//
// Change colours, fonts, or ornaments here and they'll update everywhere.
// ─────────────────────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  pageBg:         "#ede3ce",
  pageGradient:   "radial-gradient(ellipse at top, #f5ead4 0%, #ede3ce 55%, #e6d8be 100%)",
  cardBg:         "linear-gradient(135deg, #fefcf5 0%, #faf4e2 100%)",
  cardBgHover:    "linear-gradient(135deg, #fffef9 0%, #fdf8ed 100%)",
  modalBg:        "linear-gradient(160deg, #fefcf5 0%, #faf4e2 100%)",

  // Borders
  border:         "#d4c09a",
  borderHover:    "#8b2a0a",
  borderLight:    "#e8d8b8",

  // Text
  textDark:       "#2c1a08",
  textBody:       "#4a3520",
  textMuted:      "#8a7050",
  textFaint:      "#a08860",
  textSubtle:     "#6a5030",

  // Accents
  accentRed:      "#8b2a0a",
  accentGold:     "#c8a96e",
  accentGoldDark: "#c9a43a",
  accentGoldLine: "#d4c09a",

  // Timeline
  dotIdle:        "#d4b87a",
  dotActive:      "#8b2a0a",

  // Scrollbar
  scrollThumb:    "#c8b48a",
};

export const fonts = {
  display:    "'Special Elite', monospace",
  body:       "'Courier Prime', monospace",
};

export const ornaments = {
  floral:     "❧",
  fleurDeLis: "⚜",
  star:       "✦",
  flag:       "⚑",
  cross:      "✕",
  skull:      "☠",
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Special+Elite&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${colors.pageBg}; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${colors.pageBg}; }
  ::-webkit-scrollbar-thumb { background: ${colors.scrollThumb}; border-radius: 3px; }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-sub     { animation: fadeDown 0.9s 0.18s ease both; }
  .hero-ornament { animation: shimmer 3s infinite ease-in-out; }
`;
