// ─────────────────────────────────────────────────────────────────────────────
// BlogModal.jsx — full-screen overlay that renders a complete blog entry
//
// Props:
//   blog    — blog data object (from blogs.js)
//   onClose — callback to dismiss the modal
//
// The modal closes on: backdrop click, close button click, or Escape key.
// Blog body paragraphs are separated by blank lines in the content string.
// A paragraph containing only "---" renders as a decorative section divider.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import Divider from "./Divider.jsx";
import { colors, fonts, ornaments } from "../styles/theme.js";

export default function BlogModal({ blog, onClose }) {

  // Lock body scroll and register Escape key while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 12, 4, 0.75)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "3rem 1.5rem 4rem",
        backdropFilter: "blur(3px)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {/* ── Modal panel ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.modalBg,
          border: `1px solid ${colors.border}`,
          borderRadius: "14px",
          maxWidth: "720px",
          width: "100%",
          boxShadow: "0 6px 32px rgba(0,0,0,0.12)",
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          title="Close (Esc)"
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "none",
            border: "none",
            color: colors.accentRed,
            fontSize: "1.3rem",
            cursor: "pointer",
            fontFamily: fonts.display,
            lineHeight: 1,
            padding: "4px 8px",
            opacity: 0.7,
            zIndex: 2,
          }}
        >
          {ornaments.cross}
        </button>

        {/* ── Hero image ── */}
        <div style={{ position: "relative", height: "280px", overflow: "hidden", borderRadius: "14px 14px 0 0" }}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "sepia(25%) contrast(0.95) brightness(0.8)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(250,244,226,0.0) 30%, rgba(30,16,4,0.75) 100%)",
          }} />
          {/* Title overlay on image */}
          <div style={{ position: "absolute", bottom: "18px", left: "24px", right: "50px" }}>
            <div style={{
              color: colors.accentGoldDark,
              fontSize: "10px",
              fontFamily: fonts.display,
              letterSpacing: "2.5px",
              marginBottom: "6px",
            }}>
              {ornaments.flag} {blog.location}
            </div>
            <h2 style={{
              fontFamily: fonts.display,
              color: colors.accentGold,
              fontSize: "1.6rem",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "0.04em",
              textShadow: "2px 2px 0 #ffe7a0, 0 2px 6px #00000033",
            }}>
              {blog.title}
            </h2>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "2rem 2.5rem 2.5rem" }}>

          {/* Author / date meta row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}>
            <span style={{ fontFamily: fonts.body, fontStyle: "italic", color: colors.textMuted, fontSize: "0.85rem" }}>
              {blog.author}
            </span>
            <span style={{ fontFamily: fonts.body, fontStyle: "italic", color: colors.textMuted, fontSize: "0.8rem" }}>
              {blog.date} · {blog.readTime}
            </span>
          </div>

          <Divider margin="0 0 1.8rem 0" />

          {/* Blog content — split on blank lines, "---" becomes a divider */}
          <div style={{ fontFamily: fonts.body, color: "#3a2810", fontSize: "0.92rem", lineHeight: 1.95 }}>
            {blog.content.split("\n\n").map((para, i) =>
              para.trim() === "---"
                ? <Divider key={i} symbol={ornaments.star} color={colors.accentGold} margin="1.8rem 0" />
                : <p key={i} style={{ marginBottom: "1.1rem" }}>{para}</p>
            )}
          </div>

          {/* Footer divider + end stamp */}
          <Divider margin="2.5rem 0 1rem 0" />
          <p style={{
            textAlign: "center",
            fontFamily: fonts.display,
            color: colors.textFaint,
            fontSize: "0.7rem",
            letterSpacing: "2px",
          }}>
            END OF ENTRY
          </p>

        </div>
      </div>
    </div>
  );
}
