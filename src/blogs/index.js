// blogs/index.js — automatic blog loader
//
// HOW TO ADD A NEW BLOG:
//   1. Create a new file in src/blogs/ named entry_N.json
//   2. Drop any local images into:
//        src/assets/Images/       <- modal hero image
//        src/assets/thumbnails/   <- card thumbnail
//   3. In the JSON, set "image" / "thumbnail" to just the bare filename:
//        "image": "evil-gate.png"
//        "thumbnail": "evil-priest-thumb.png"
//      Full URLs (e.g. Unsplash) pass through unchanged.
//      That's it — no other files need changing.
//
// JSON SCHEMA for each entry file:
// {
//   "id":        number  — unique ID, used as React key
//   "date":      string  — in-world date string
//   "location":  string  — where the party is
//   "title":     string  — blog post title
//   "author":    string  — which party member wrote it
//   "sessions":  number  — sessions played
//   "image":     string  — bare filename OR full URL for the modal hero
//   "thumbnail": string  — bare filename OR full URL for the card thumbnail
//   "preview":   string  — short teaser shown on the timeline card
//   "content":   string  — full blog text; separate paragraphs with \n\n
//                          use "---" on its own line for a section break
// }

// Eagerly import every file from both asset folders so Vite fingerprints and
// bundles them, then build a flat filename -> resolved URL lookup map.
const imageModules = import.meta.glob(
  ["../assets/Images/**/*", "../assets/thumbnails/**/*"],
  { eager: true }
);

const imageByName = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [
    path.split("/").pop(),
    mod.default,
  ])
);

const modules = import.meta.glob("./*.json", { eager: true });

const blogs = Object.values(modules)
  .map((mod) => {
    const entry = mod.default ?? mod;
    return {
      ...entry,
      image:     imageByName[entry.image]     ?? entry.image,
      thumbnail: imageByName[entry.thumbnail] ?? entry.thumbnail,
    };
  })
  .sort((a, b) => a.id - b.id);

export default blogs;
