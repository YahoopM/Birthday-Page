# Our Story — A Birthday Surprise 💌

A private, cinematic birthday website built just for her. Pure HTML/CSS/JS,
no backend, no build step — just open it in a browser.

---

## 1. Where to put photos

Drop your real photos into `assets/photos/`, using **exactly these filenames**
(just replace the files — keep the names the same):

```
assets/photos/first-meeting.jpg     → Chapter 01, the hero photo
assets/photos/memory-01.jpg         → Chapter 02 + a memory envelope
assets/photos/memory-02.jpg         → Chapter 02 + a memory envelope
assets/photos/memory-03.jpg         → Chapter 02 + a memory envelope
assets/photos/funny-01.jpg          → Chapter 03 (Crazy Us) + a memory envelope
assets/photos/trip-01.jpg           → Chapter 04 (Our Adventures) + a memory envelope
assets/photos/favorite-photo.jpg    → Chapter 06 (My Favorite Person)
```

Any photo you haven't added yet will automatically show a soft placeholder
card instead of a broken image — so the site never looks broken while you're
still gathering photos.

Want more memory photos? Just add files like `memory-04.jpg`, `memory-05.jpg`,
etc., and reference them in the `memories` array in `script.js` (see below).

**Tip:** portrait or square photos work best for the polaroid cards. Landscape
photos work great for the "Our Adventures" trip photo.

## 2. Where to put the music

Put a single MP3 file at:

```
assets/music/our-song.mp3
```

That's it — the filename is fixed, so just rename your song to
`our-song.mp3` (or export/convert it to that name).

The music starts automatically the moment she clicks "Open My Surprise"
(browsers block autoplay before that, so this is intentional and required).

## 3. How to change her name

Open `script.js`, find the `CONFIG` object near the top
(look for `// ===== EASY CUSTOMIZATION =====`), and change:

```js
herName: "HER NAME",
```

to her actual name, e.g. `herName: "Ava",`. It updates the big name on the
final birthday screen and the browser tab title automatically.

## 4. How to change messages

All the editable text lives in the same `CONFIG` object at the top of
`script.js`:

- `openingMessage1`, `openingMessage2Line1`, `openingMessage2Line2` — the opening screen
- `chapter01Text` — the text under the first photo
- `surpriseLine1`, `surpriseLine2` — the final transition before the reveal
- `birthdayEyebrow`, `birthdayMessageHTML` — the big birthday screen
- `letterParagraphs` (an array — one entry per paragraph) and `letterSignoff` — the personal letter

Just edit the text between the quotes. No HTML knowledge required, though
`birthdayMessageHTML` does use `<br>` for line breaks if you want to keep that style.

Small captions under individual photos (like "where it all started") live
directly in `index.html` inside `<figcaption>` tags if you want to tweak those too.

## 5. How to add memories (Chapter 05 envelopes)

In `script.js`, find the `memories` array and add new objects in this shape:

```js
{
  icon: "💌",
  title: "That Day",
  image: "assets/photos/memory-01.jpg",
  message: "You probably don't remember this day..."
}
```

Add as many as you like — 5, 10, 20 — the envelope grid will lay itself out
automatically.

## 6. How to add reasons

In `script.js`, find the `reasons` array — it's just a plain list of
strings:

```js
const reasons = [
  "Your smile.",
  "The way you care about me.",
  // add more here
];
```

## 7. How to add timeline events

Two different timelines exist:

**Our Adventures timeline (Chapter 04)** — edit the `timelineEvents` array:

```js
{ year: "2024", label: "Our first adventure" },
```

**"Our Story" timeline (near the end)** — edit the `storyTimeline` array.
The `target` field is the `id` of the chapter/section it should scroll to
when clicked (you can see all the section ids in `index.html`, e.g.
`chapter-01`, `chapter-04`, `chapter-birthday`).

```js
{ icon: "❤️", label: "First Date", target: "chapter-04" },
```

## 8. How to run it locally

You can't just double-click `index.html` in some browsers because of how
they handle local file access for things like the music player — a tiny
local server avoids any of those quirks. Pick whichever is easiest for you:

**Option A — Python (already installed on most Macs/Linux):**
```bash
cd birthday-surprise
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

**Option B — VS Code:**
Install the "Live Server" extension, right-click `index.html`, choose
"Open with Live Server."

**Option C — Node.js:**
```bash
npx serve .
```

Once she's ready to see it, you can also upload the whole folder to any
free static host (Netlify, Vercel, GitHub Pages) and just send her the link —
no code changes needed.

---

## A few notes

- Everything is responsive — tested down to small phone widths.
- Reduced-motion is respected: if her OS has "reduce motion" turned on,
  animations are minimized automatically.
- The site is entirely self-contained: no database, no analytics, no
  external services besides Google Fonts.
- If you want to change colors, all of them are defined once at the very
  top of `style.css` under `:root` — change a value there and it updates
  everywhere.

Enjoy putting it together. 🖤
