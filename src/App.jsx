// ─────────────────────────────────────────────────────────────────────────────
// App.jsx — root component
//
// Responsibilities:
//   - Inject global styles (fonts, resets, keyframes)
//   - Hold the "which blog is open" state
//   - Compose Header + Timeline + BlogModal
//
// To add or edit blog content, see: src/blogs.js
// To change colours or fonts, see:  src/styles/theme.js
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

import blogs                     from "./blogs/index.js";
import { colors, globalStyles }  from "./styles/theme.js";
import Header                    from "./components/Header.jsx";
import Timeline                  from "./components/Timeline.jsx";
import BlogModal                 from "./components/BlogModal.jsx";

export default function App() {
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <>
      <style>{globalStyles}</style>

      <div style={{
        minHeight: "100vh",
        background: colors.pageGradient,
        fontFamily: "serif",
        position: "relative",
      }}>

        {/* Subtle paper-grain texture overlay */}
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
          opacity: 0.45,
          pointerEvents: "none",
        }} />

        <Header />
        <Timeline blogs={blogs} onRead={setActiveBlog} />

      </div>

      {activeBlog && (
        <BlogModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
}
