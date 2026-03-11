// ─────────────────────────────────────────────────────────────────────────────
// blogs/index.js — automatic blog loader
//
// HOW TO ADD A NEW BLOG:
//   1. Create a new file in src/blogs/ named entry_N.json
//   2. Follow the schema below — that's it. No other files need changing.
//
// JSON SCHEMA for each entry file:
// {
//   "id":       number       — unique ID, used as React key (e.g. 5)
//   "date":     string       — in-world date string
//   "location": string       — where the party is
//   "title":    string       — blog post title
//   "author":   string       — which party member wrote it
//   "image":    string       — full image URL (e.g. from unsplash.com?w=600&q=80)
//   "preview":  string       — short teaser shown on the timeline card
//   "readTime": string       — e.g. "6 min read"
//   "content":  string       — full blog text; separate paragraphs with \n\n
//                              use "---" on its own line for a section break
// }
//
// HOW IT WORKS:
//   Vite's import.meta.glob() scans all .json files in this folder at build
//   time and bundles them in. The entries are then sorted by their "id" field
//   so the timeline always appears in the correct order regardless of filename.
// ─────────────────────────────────────────────────────────────────────────────

const modules = import.meta.glob("./*.json", { eager: true });

const blogs = Object.values(modules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => a.id - b.id);

export default blogs;
