// ─────────────────────────────────────────────────────────────────────────────
// Divider.jsx — decorative horizontal rule used throughout the app
//
// Props:
//   symbol  — the centre character (defaults to ❧)
//   color   — colour of the centre symbol
//   width   — width of each line arm ("80px", "120px", etc.)
//   margin  — vertical margin around the divider ("0" = none)
// ─────────────────────────────────────────────────────────────────────────────

import { colors, ornaments } from "../styles/theme.js";

export default function Divider({
  symbol = ornaments.floral,
  color = colors.accentRed,
  lineColor = colors.accentGoldLine,
  width = "100%",
  margin = "0",
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: margin,
      width: width,
    }}>
      <div style={{
        flex: 1,
        height: "1px",
        background: `linear-gradient(to right, transparent, ${lineColor})`,
      }} />
      <span style={{ color, fontSize: "11px", lineHeight: 1 }}>{symbol}</span>
      <div style={{
        flex: 1,
        height: "1px",
        background: `linear-gradient(to left, transparent, ${lineColor})`,
      }} />
    </div>
  );
}
