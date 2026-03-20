import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard.jsx";

/* ── inject scoped CSS once ─────────────────────────────────────────────── */
function injectCSS() {
  if (document.getElementById("tl-css")) return;
  const s = document.createElement("style");
  s.id = "tl-css";
  s.textContent = `
    .tl-wrap {
      position: relative;
      max-width: 1100px;
      margin: 0 auto;
      padding: calc(1.5rem + 25px) 2rem 8rem;
    }

    /* ── straight dashed spine — stops at centre of End.png ── */
    .tl-line {
      position: absolute;
      left: 50%;
      top: 25px;
      bottom: calc(2rem + 96px);
      width: 3px;
      transform: translateX(-50%);
      background: repeating-linear-gradient(
        to bottom,
        #250000 0 14px,
        transparent 14px 26px
      );
      opacity: 0.7;
      pointer-events: none;
      z-index: 0;
    }

    /* ── row: card left | dot | card right ── */
    .tl-row {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 56px;
    }

    .tl-side {
      flex: 1;
      display: flex;
    }
    .tl-side--left  { justify-content: flex-end; padding-right: 46px; }
    .tl-side--right { justify-content: flex-start; padding-left: 46px; }
    .tl-gap { flex: 1; }

    /* ── dot on the spine ── */
    .tl-dot {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #4b2e13;
      background: #f9f2e3;
      z-index: 3;
      pointer-events: none;
      transition: background 0.2s, transform 0.2s;
    }
    .tl-row:hover .tl-dot {
      background: #4b2e13;
      transform: translate(-50%, -50%) scale(1.35);
    }

    /* ── horizontal tick from dot to card ── */
    .tl-tick {
      position: absolute;
      top: 50%;
      height: 2px;
      background: #4b2e13;
      opacity: 0.35;
      transform: translateY(-50%);
      z-index: 2;
      pointer-events: none;
    }

    /* ── end marker ── */
    .tl-end {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 3;
    }
    .tl-end-label {
      font-family: serif;
      font-size: 0.8rem;
      color: #4b2e13;
      opacity: 0.85;
      letter-spacing: 0.4px;
    }

    /* ── mobile: single column ── */
    /*
      .tl-line is absolute in .tl-wrap (border box).
      .tl-dot  is absolute in .tl-row  (sits inside .tl-wrap padding = offset by 2rem).
      Fix: remove .tl-wrap left-padding on mobile so both share the same origin.
      Spine + dot both at left:36px. End.png is 72px wide so left-edge at 0
      puts its centre exactly on the 36px spine.
    */
    @media (max-width: 680px) {
      .tl-wrap { padding-left: 0; padding-right: 1rem; }
      .tl-line { left: 36px; transform: none; }
      .tl-row  { flex-direction: column; align-items: flex-start; padding-left: 64px; margin-bottom: 36px; }
      .tl-side, .tl-side--left, .tl-side--right { flex: none; width: 100%; padding: 0; justify-content: flex-start; }
      .tl-gap  { display: none; }
      .tl-dot  { left: 37px; top: 50%; transform: translate(-50%, -50%); }
      .tl-row:hover .tl-dot { transform: translate(-50%, -50%) scale(1.35); }
      .tl-tick { display: none; }
      .tl-end  { position: absolute; bottom: calc(2rem + 34px); left: 3px; transform: none; flex-direction: row; align-items: center; gap: 8px; }
    }
  `;
  document.head.appendChild(s);
}

/* ── Row component (needs its own ref for tick measurement) ─────────────── */
function Row({ blog, index, onRead }) {
  const ref    = useRef(null);
  const isLeft = index % 2 === 0;
  const [tickW, setTickW] = useState(0);

  useEffect(() => {
    const measure = () => {
      const row = ref.current;
      if (!row) return;
      const mid  = row.getBoundingClientRect().left + row.getBoundingClientRect().width / 2;
      const slot = row.querySelector(isLeft ? ".tl-side--left" : ".tl-side--right");
      if (!slot) return;
      const sr = slot.getBoundingClientRect();
      setTickW(Math.max(0, isLeft ? mid - sr.right - 8 : sr.left - mid - 8));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [isLeft]);

  const tickPos = isLeft
    ? { right: "calc(50% + 9px)", width: tickW }
    : { left:  "calc(50% + 9px)", width: tickW };

  return (
    <div className="tl-row" ref={ref}>
      {isLeft
        ? <div className="tl-side tl-side--left"><BlogCard blog={blog} index={index} onRead={onRead} /></div>
        : <div className="tl-gap" />}

      <div className="tl-dot" />
      <div className="tl-tick" style={tickPos} />

      {!isLeft
        ? <div className="tl-side tl-side--right"><BlogCard blog={blog} index={index} onRead={onRead} /></div>
        : <div className="tl-gap" />}
    </div>
  );
}

/* ── Timeline ───────────────────────────────────────────────────────────── */
export default function Timeline({ blogs, onRead }) {
  useEffect(injectCSS, []);

  return (
    <>
      {/* Logo above the timeline */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "0 auto 1.5rem",
        padding: "0 2rem",
      }}>
        <img
          src="/Assets/Images/snakefatInsider.png"
          alt="The Snakefat Insider"
          style={{
            maxWidth: "320px",
            width: "100%",
            height: "auto",
            border: "2px solid #4b2e13",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            mixBlendMode: "multiply",
          }}
        />
        <a
          href="https://snakefat-home.vercel.app/"
          style={{
            marginTop: "5px",
            maxWidth: "320px",
            width: "100%",
            padding: "10px 24px",
            backgroundColor: "#4b2e13",
            color: "#f9f2e3",
            border: "2px solid #4b2e13",
            borderRadius: "4px",
            textDecoration: "none",
            fontFamily: "serif",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f9f2e3";
            e.currentTarget.style.color = "#4b2e13";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4b2e13";
            e.currentTarget.style.color = "#f9f2e3";
          }}
        >
          ← Home
        </a>
      </div>

      <main className="tl-wrap">
        <div className="tl-line" />

        {blogs.map((blog, i) => (
          <Row key={blog.id} blog={blog} index={i} onRead={onRead} />
        ))}

        <div className="tl-end">
          <img
            src="/Assets/Images/End.png"
            alt="End"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
          <span className="tl-end-label">Our intrepid adventurers are here!</span>
        </div>
      </main>
    </>
  );
}