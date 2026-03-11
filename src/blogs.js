// ─────────────────────────────────────────────────────────────────────────────
// blogs.js — auto-loads every entry_*.json file from the /blogs folder
//
// HOW TO ADD A NEW BLOG ENTRY:
//   1. Create a new file in src/blogs/ named entry_5.json, entry_6.json, etc.
//   2. Follow the same JSON structure as the existing files.
//   3. Save the file — the app picks it up automatically, no other changes needed.
//
// FIELD REFERENCE:
//   id        — unique number (should match the file number, e.g. 5 for entry_5.json)
//   date      — in-world date string
//   location  — where the party is
//   title     — blog post title
//   author    — which party member wrote it
//   image     — photo URL (tip: use images from unsplash.com, append ?w=600&q=80)
//   readTime  — estimated read time, e.g. "5 min read"
//   preview   — short excerpt shown on the timeline card (2–4 sentences)
//   content   — full blog text. Separate paragraphs with a blank line (\n\n).
//               Use a paragraph containing only --- for a decorative section break.
// ─────────────────────────────────────────────────────────────────────────────

// import.meta.glob is a Vite feature that imports all matching files at build time.
// { eager: true } means the files are loaded immediately (no async needed).
const modules = import.meta.glob("./blogs/*.json", { eager: true });

// Sort by filename so entries always appear in order (entry_1, entry_2, ...)
const blogs = Object.keys(modules)
  .sort()
  .map((path) => modules[path].default ?? modules[path]);

export default blogs;
