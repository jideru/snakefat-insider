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
  const isLeft   = index % 2 === 0;
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const readMins  = calcReadTime(blog.content);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "380px",
        background: hovered ? colors.cardBgHover : colors.cardBg,
        border: `2px solid ${hovered ? colors.borderHover : colors.textDark}`,
        borderRadius: "3px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transform: `rotate(${hovered ? rotation * 0.4 : rotation}deg) ${hovered ? "scale(1.03)" : "scale(1)"}`,
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: hovered
          ? "6px 8px 28px rgba(44,26,8,0.28), 2px 3px 8px rgba(44,26,8,0.15)"
          : "4px 5px 18px rgba(44,26,8,0.18), 1px 2px 5px rgba(44,26,8,0.1)",
      }}
    >
      {/* ── Top row: thumbnail + metadata ── */}
      <div style={{ display: "flex", gap: "12px", padding: "14px 14px 10px" }}>

        {/* Thumbnail */}
        <div style={{
          flexShrink: 0,
          width: "90px",
          height: "90px",
          border: `1.5px solid ${colors.textDark}`,
          borderRadius: "2px",
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
            fontStyle: "italic",
            color: colors.textMuted,
            fontSize: "0.7rem",
            letterSpacing: "0.5px",
          }}>
            {blog.date}
          </div>
          <div style={{
            fontFamily: fonts.display,
            color: colors.textDark,
            fontSize: "0.95rem",
            fontWeight: 400,
            lineHeight: 1.25,
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}>
            {blog.title}
          </div>
          <div style={{
            fontFamily: fonts.body,
            color: colors.textBody,
            fontSize: "0.72rem",
            letterSpacing: "0.5px",
          }}>
            {ornaments.flag} {blog.location}
          </div>
          <div style={{
            fontFamily: fonts.body,
            fontStyle: "italic",
            color: colors.textMuted,
            fontSize: "0.68rem",
            letterSpacing: "0.5px",
          }}>
            ⏱ {readMins} min read
          </div>
        </div>
      </div>

      {/* ── Skull divider ── */}
      <div style={{ padding: "0 14px", marginBottom: "8px" }}>
        <Divider symbol="☠" color={colors.textDark} lineColor={colors.textDark} />
      </div>

      {/* ── Preview text ── */}
      <div style={{ padding: "0 14px 14px" }}>
        <p style={{
          fontFamily: fonts.body,
          color: colors.textBody,
          fontSize: "0.82rem",
          lineHeight: 1.8,
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {blog.preview}
        </p>
      </div>

      {/* ── Footer bar ── */}
      <div style={{
        display: "flex",
        borderTop: `2px solid ${colors.textDark}`,
      }}>
         {/* Author */}
        <div style={{
          flex: 1,
          padding: "7px 12px",
          background: colors.textDark,
          fontFamily: fonts.display,
          color: "#fdf6e8",
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
                {/*  sessions label */}
        <div style={{
          flex: 1,
          padding: "7px 24px",
          background: colors.textDark,
          fontFamily: fonts.display,
          color: "#fdf6e8",
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
            background: hovered ? "#6b1f07" : colors.accentRed,
            border: "none",
            borderLeft: `2px solid ${hovered ? "#6b1f07" : colors.accentRed}`,
            fontFamily: fonts.display,
            color: "#fdf6e8",
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
    </div>
  );
}