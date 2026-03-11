import Divider from "./Divider.jsx";
import { colors, fonts, ornaments } from "../styles/theme.js";

const SITE_TITLE    = "The Snakefat Insider";
const SITE_TAGLINE  = "We keep tabs on the local heroes of Snakefat!";

export default function Header() {
  return (
    <header style={{ textAlign: "center", padding: "5rem 2rem 1.5rem", position: "relative" }}>

      {/* Top decorative rule */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "2rem" }}>
        <div style={{ height: "1px", width: "120px", background: `linear-gradient(to right, transparent, ${colors.accentGold})` }} />
        <span className="hero-ornament" style={{ color: colors.accentRed, fontSize: "20px" }}>
          {ornaments.fleurDeLis}
        </span>
        <div style={{ height: "1px", width: "120px", background: `linear-gradient(to left, transparent, ${colors.accentGold})` }} />
      </div>

      {/* Site title */}
      <p className="hero-sub" style={{
        fontFamily: fonts.display,
        color: colors.accentRed,
        fontSize: "0.72rem",
        letterSpacing: "5px",
        textTransform: "uppercase",
        marginBottom: "1.4rem",
      }}>
        {SITE_TITLE}
      </p>

      {/* Tagline */}
      <p className="hero-sub" style={{
        fontFamily: fonts.body,
        fontStyle: "italic",
        color: colors.textSubtle,
        fontSize: "1.05rem",
        maxWidth: "500px",
        margin: "0 auto 2rem",
        lineHeight: 1.75,
        whiteSpace: "pre-line",
      }}>
        {SITE_TAGLINE}
      </p>

      {/* Bottom decorative rule */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <div style={{ height: "1px", width: "80px", background: `linear-gradient(to right, transparent, ${colors.accentGoldLine})` }} />
        <span style={{ color: colors.accentGold, fontSize: "16px" }}>{ornaments.floral}</span>
        <div style={{ height: "1px", width: "80px", background: `linear-gradient(to left, transparent, ${colors.accentGoldLine})` }} />
      </div>

    </header>
  );
}
