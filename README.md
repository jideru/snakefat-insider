# 📜 Tales of the Snakefat Adventurers

A travelling journal blog for a Dungeons & Dragons adventurer party. Built with React + Vite.

---

## 🗂 Project Structure

```
snakefat-blog/
├── index.html          ← App entry point
├── package.json        ← Dependencies & scripts
├── vite.config.js      ← Vite configuration
├── README.md           ← You are here
└── src/
    ├── main.jsx        ← React root mount
    └── App.jsx         ← Main blog component (all your content lives here)
```

---

## 🚀 Getting Started on Mac

### Prerequisites

**1. Install Node.js**

The easiest way on Mac is via [Homebrew](https://brew.sh). If you don't have Homebrew, open **Terminal** (press `⌘ + Space`, type "Terminal", hit Enter) and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install Node.js:

```bash
brew install node
```

Verify it worked:

```bash
node --version
```

You should see something like `v20.x.x`.

> **Alternative:** If you'd rather not use Homebrew, download the macOS installer directly from [nodejs.org](https://nodejs.org/).

**2. Install VS Code**

Download from [code.visualstudio.com](https://code.visualstudio.com/) and drag it into your Applications folder.

---

### Step 1 — Unzip the project

Double-click `snakefat-blog.zip` in Finder. This creates a `snakefat-blog` folder.

Move it somewhere you'll remember, like your Desktop or Documents.

---

### Step 2 — Open in VS Code

Open VS Code, then:

```
File → Open Folder → select the snakefat-blog folder → Open
```

---

### Step 3 — Open the Terminal

In VS Code, open the integrated terminal with:

```
⌃ + `   (Control + backtick)
```

Or from the menu: `Terminal → New Terminal`

The terminal should show you're inside the `snakefat-blog` folder.

---

### Step 4 — Install dependencies

Run:

```bash
npm install
```

This downloads React, Vite, and all required packages into a `node_modules/` folder. Only needs to be done once.

---

### Step 5 — Start the development server

```bash
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

---

### Step 6 — View in browser

**Option A:** Hold `⌘` and click the `http://localhost:5173/` link in the terminal — it opens automatically.

**Option B:** Open Safari or Chrome and go to:

```
http://localhost:5173
```

Your blog is live. Any changes you save in VS Code will hot-reload in the browser instantly.

---

### Stopping the server

Press `⌃ + C` (Control + C) in the terminal to stop it.

---

## ✏️ Editing the Blog

All blog content and styling lives in **`src/App.jsx`**.

### To add a new blog entry:

Find the `blogs` array near the top of `App.jsx` and add a new object:

```js
{
  id: 6,
  date: "15th Day of the Frost Moon, Year 412",
  location: "The Whispering Fen, Eastern Wilds",
  title: "Something Followed Us Out of the Fen",
  author: "Pip Gallowglass, Rogue (Unauthorized Correspondent)",
  image: "https://images.unsplash.com/photo-XXXXXXX?w=600&q=80",
  preview: "Your blog preview text goes here...",
  readTime: "5 min read",
},
```

> **Tip for images:** Visit [unsplash.com](https://unsplash.com), find a photo, copy the URL from your browser, and paste it into the `image` field. Add `?w=600&q=80` at the end for optimised loading.

---

## 🔨 Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with your compiled site, ready to host anywhere.

---

## 🧰 Recommended VS Code Extensions

Open the Extensions panel with `⌘ + Shift + X` and search for:

- **ES7+ React/Redux/React-Native snippets** — helpful React shortcuts
- **Prettier** — auto-formats your code on save
- **ESLint** — catches common code errors

---

*May your dice roll true and your boots stay dry.*
