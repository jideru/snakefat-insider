// ─────────────────────────────────────────────────────────────────────────────
// BlogCard.jsx — pinned-note style card matching the hand-drawn sketch layout
//
// Layout per card:
//   Top row:  [ thumbnail ]  [ date / title / location ]
//   Divider:  ────── ☠ ──────
//   Body:     preview text
//   Footer:   [ author ]  [ READ MORE ]
//
// Props:
//   blog      — blog data object
//   index     — position, used for left/right placement and rotation
//   onRead    — callback when READ MORE is clicked
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Divider from "./Divider.jsx";
import { colors, fonts, ornaments } from "../styles/theme.js";

// Average adult reading speed (words per minute)
const WPM = 238;
function calcReadTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / WPM);
}

// Slight alternating rotations — like notes pinned to a map
const ROTATIONS = [-2, 1.5, -1.2, 2.2, -1.8, 1, -2.5, 1.5];

export default function BlogCard({ blog, index, onRead }) {
  const [hovered, setHovered] = useState(false);
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const readMins  = calcReadTime(blog.content);
  const isEvent = blog.type === "event";

  return (
    <div
      onClick={() => { if (!isEvent) onRead(blog); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "380px",
        background: isEvent
          ? (hovered ? "linear-gradient(135deg, #3a0a0a 0%, #2a0505 100%)" : "linear-gradient(135deg, #2e0808 0%, #200404 100%)")
          : (hovered ? colors.cardBgHover : colors.cardBg),
        border: `1px solid ${hovered ? colors.borderHover : (isEvent ? "rgba(139,42,10,0.5)" : "rgba(0,0,0,0.25)")}`,
        borderRadius: "12px",
        overflow: "hidden",
        cursor: isEvent ? "default" : "pointer",
        position: "relative",
        transform: `rotate(${hovered ? rotation * 0.4 : rotation}deg) ${hovered ? "scale(1.03)" : "scale(1)"}`,
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: hovered
          ? "0 6px 18px rgba(0,0,0,0.18)"
          : "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* ── Top row: thumbnail + metadata ── */}
      <div style={{ display: "flex", gap: "12px", padding: "16px 16px 12px" }}>

        {/* Thumbnail */}
        <div style={{
          flexShrink: 0,
          width: "90px",
          height: "90px",
          border: `1px solid ${colors.border}`,
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          <img
            src={blog.thumbnail ?? blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "sepia(35%) contrast(0.95) brightness(0.88)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        </div>

        {/* Date / Title / Location stack */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
          <div style={{
            fontFamily: fonts.body,
            color: isEvent ? "#c8a96e99" : colors.textMuted,
            fontSize: "0.7rem",
            letterSpacing: "0.5px",
          }}>
            {blog.date}
          </div>
          <div style={{
            fontFamily: fonts.display,
            color: isEvent ? colors.accentGold : colors.textSubtle,
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: "0.04em",
            textShadow: isEvent ? "1px 1px 4px #00000066" : "2px 2px 0 #ffe7a0, 0 2px 6px #00000033",
          }}>
            {blog.title}
          </div>
          <div style={{
            fontFamily: fonts.body,
            color: isEvent ? colors.accentGold : colors.textBody,
            fontSize: "0.72rem",
            letterSpacing: "0.5px",
          }}>
            {ornaments.flag} {blog.location}
          </div>
          {!isEvent && (
            <div style={{
              fontFamily: fonts.body,
              fontStyle: "italic",
              color: colors.textMuted,
              fontSize: "0.68rem",
              letterSpacing: "0.5px",
            }}>
              ⏱ {readMins} min read
            </div>
          )}
        </div>
      </div>

      {/* ── Skull divider ── */}
      <div style={{ padding: "0 14px", marginBottom: "8px" }}>
        <Divider symbol="☠" color={isEvent ? colors.accentGold : colors.textDark} lineColor={isEvent ? "rgba(200,169,110,0.3)" : colors.borderLight} />
      </div>

      {/* ── Preview text ── */}
      <div style={{ padding: "0 14px 14px" }}>
        <p style={{
          fontFamily: fonts.body,
          color: isEvent ? "#c8a96ecc" : colors.textBody,
          fontSize: "0.82rem",
          lineHeight: 1.8,
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {blog.content.length > 150 ? blog.content.slice(0, 150) + "..." : blog.content}
        </p>
      </div>

      {/* ── Footer bar (news only) ── */}
      {!isEvent && (
        <div style={{
          display: "flex",
          borderTop: `1px dotted ${colors.borderLight}`,
        }}>
         <style>{`@media (max-width: 480px) { .card-author { display: none !important; } }`}</style>
          {/* Author */}
          <div className="card-author" style={{
            flex: 1,
            padding: "7px 12px",
            background: colors.accentRed,
            fontFamily: fonts.display,
            color: colors.accentGold,
            fontSize: "0.65rem",
            letterSpacing: "1.5px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
            {blog.author.split(",")[0].toUpperCase()}
          </div>
          {/* Sessions label */}
          <div style={{
            flex: 1,
            padding: "7px 24px",
            background: colors.accentRed,
            fontFamily: fonts.display,
            color: colors.accentGold,
            fontSize: "0.65rem",
            letterSpacing: "1.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
            Sessions played: {blog.sessions}
          </div>
          {/* Read more button */}
          <button
            onClick={(e) => { e.stopPropagation(); onRead(blog); }}
            style={{
              padding: "7px 24px",
              background: hovered ? "#2a1500" : colors.borderHover,
              border: "none",
              borderLeft: `1px solid rgba(0,0,0,0.25)`,
              fontFamily: fonts.display,
              color: colors.accentGold,
              fontSize: "0.65rem",
              letterSpacing: "1.5px",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s ease",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            READ MORE
          </button>
        </div>
      )}
    </div>
  );
}