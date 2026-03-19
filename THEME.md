# Snakefat Tavern Theme

Medieval fantasy parchment theme with warm browns and golds inspired by D&D character sheets.

## Colors

```
Primary Dark Brown:       #4b2e13
Darker Brown:             #2a1500
Mid Brown:                #6b4c1b
Light Brown:              #7a5630
Background Parchment:     #f2ece0
Card Background:          #fffaf2
Accent Tan/Border:        #c8aa80
Light Tan/Divider:        #e0cba8
Gold/Cream:               #ffe7a0
Light Accent:             #f9f2e3

Role-Based Card Borders:
  Player (Green):         rgba(0,100,0,0.5)
  Retainer (Purple):      rgba(75,0,130,0.5)
  Hireling (Orange):      rgba(255,140,0,0.5)
  NPC (Gray):             rgba(0,0,0,0.15)

Info Card Backgrounds:
  Retainer (Purple):      #ede6fa with border #c7b3e6
  Hireling (Orange):      #ffe7c2 with border #e6cfa3
  Shares (Tan):           #f6eee3 with border #d6c3a3
```

## Typography

```
Adventure Font (Headers):
  Font Family:     'Pirata One', cursive, fantasy, serif
  Usage:           Character names, major headings
  Color:           #3a2200 (default) or #ffe7a0 (on dark backgrounds)
  Letter Spacing:  0.04em
  Text Shadow:     2px 2px 0 #ffe7a0, 0 2px 6px #00000033

Default Font:
  Font Family:     serif
  Body Text:       #3a2200 or #4b2e13
  Line Height:     1.4-1.55
```

## Spacing & Layout

```
Base Padding:         14px-18px
Container Max Width:  1100px
Border Radius:
  Major (boxes):      14px
  Sections:           8px
  Images:             10px-12px
  Small:              6px
Gap/Gaps:             12px-16px
```

## Borders & Shadows

```
Section Borders:      1px solid #c8aa80
Header Borders:       2px solid #4b2e13
Card Borders:         1px solid rgba(0,0,0,0.25)
Dotted Dividers:      1px dotted #e0cba8

Box Shadows:
  Light:              0 4px 10px rgba(0,0,0,0.08)
  Medium:             0 6px 18px rgba(0,0,0,0.18)
  Deep:               0 6px 32px rgba(0,0,0,0.12)
  Portrait:           0 4px 12px rgba(0,0,0,0.18)
```

## Component Styles

### Section Headers (Dark Banner)
```
Background:       #4b2e13
Text Color:       #ffe7a0
Font Family:      'Pirata One', cursive, fantasy, serif
Font Size:        0.85rem
Letter Spacing:   0.12em
Text Transform:   uppercase
Padding:          4px 10px
```

### Stat Boxes
```
Border:           1px solid #c8aa80
Background:       #f9f2e3
Border Radius:    6px
Padding:          6px 4px 4px
Label Color:      #6b4c1b (uppercase, 0.65rem)
Value Color:      #2a1500 (bold, 1rem)
```

### Info Cards
```
Border Radius:    10px
Padding:          12px 14px 10px 14px
Font Size:        0.9rem (body), 1rem (heading)
Heading Weight:   bold
```

### Cards
```
Display:          flex flex-direction column
Padding:          16px
Border Radius:    12px
Gap:              12px
Shadow:           0 4px 10px rgba(0,0,0,0.08)
Border:           1px solid rgba(0,0,0,0.25)
Font Size:        12px
```

## Grid Layout

```
Homepage Grid:        repeat(4, 1fr) with 15px gap
Mobile Grid:          repeat(2, 1fr) with 5px gap
Ability Grid:         repeat(3, 1fr) with 6px gap
Character Columns:    repeat(2, 1fr) with 16px gap
Mobile Columns:       1fr (single column)
```

## Theme Application Reference

When applying this theme to new projects, use these CSS custom properties:

```css
:root {
  --color-primary-dark: #4b2e13;
  --color-darker: #2a1500;
  --color-mid: #6b4c1b;
  --color-light: #7a5630;
  --color-bg-main: #f2ece0;
  --color-bg-card: #fffaf2;
  --color-border: #c8aa80;
  --color-border-light: #e0cba8;
  --color-accent: #ffe7a0;
  --color-accent-bg: #f9f2e3;
  
  --font-adventure: 'Pirata One', cursive, fantasy, serif;
  --font-body: serif;
  
  --radius-major: 14px;
  --radius-section: 8px;
  --radius-small: 6px;
  
  --shadow-light: 0 4px 10px rgba(0,0,0,0.08);
  --shadow-medium: 0 6px 18px rgba(0,0,0,0.18);
  --shadow-deep: 0 6px 32px rgba(0,0,0,0.12);
  
  --spacing-base: 14px;
  --spacing-large: 18px;
  --spacing-gap: 16px;
}
```

---

**Theme Name:** Medieval Tavern Parchment
**Inspiration:** D&D Character Sheets × Fantasy Adventure UI
**Mood:** Warm, nostalgic, quest-ready
