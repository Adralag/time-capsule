# One Year, Sealed. — a digital time capsule

React + Vite + Tailwind + Framer Motion. Built to be personalized in one
file and shipped tonight.

## 1. Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## 2. Personalize everything

Open **`src/content.js`**. That's the only file you need to touch for
content — names, the security question/answer, every timeline entry,
gallery captions, the full letter text, the vault's unlock date and
message, and the audio track path. Every field has an inline comment
explaining what it does.

**Don't forget to change `unlock.answer`** — it ships with a placeholder
(`"CHANGE-ME"`) on purpose so you don't accidentally send the real link
with a guessable default.

## 3. Add your photos & song

Drop files into:
- `public/images/` — filenames are listed in `public/images/PUT-YOUR-PHOTOS-HERE.md`
- `public/audio/` — one mp3, see `public/audio/PUT-YOUR-SONG-HERE.md`

Delete those two `.md` instruction files once you've swapped in real
media (they're not linked from the site, just notes for you).

Compress photos before adding them — aim for under ~500KB each
(1600px on the long edge, JPEG quality ~80) so the site stays fast on
her phone. [Squoosh](https://squoosh.app) is a fast, free way to do this.

## 4. Preview the real build

```bash
npm run build
npm run preview
```

This is the closest thing to what she'll actually see — worth a final
click-through before you ship.

## 5. Put it on GitHub

```bash
git init
git add .
git commit -m "our time capsule"
gh repo create our-time-capsule --private --source=. --push
```

(No `gh` CLI? Create an empty repo on github.com, then `git remote add
origin <url>` and `git push -u origin main`.) Keep the repo **private**
— the letter and security answer live in this code.

## 6. Deploy — Vercel

1. [vercel.com/new](https://vercel.com/new) → import the GitHub repo.
2. Framework preset: **Vite** (auto-detected). Build command
   `npm run build`, output directory `dist` — Vercel fills these in
   automatically.
3. Deploy. Every push to `main` redeploys automatically, so you can
   fix a typo or swap a photo after she already has the link.

## 6b. Deploy — Netlify (alternative)

1. [app.netlify.com](https://app.netlify.com) → **Add new site** →
   **Import an existing project** → pick the repo.
2. `netlify.toml` is already in the repo, so build settings
   (`npm run build`, publish `dist`) are picked up automatically.
3. Deploy. Same continuous-deployment behavior as Vercel.

## What's inside

| Section | File |
| Unlock screen / hero | `src/components/UnlockScreen.jsx` |
| Vertical timeline | `src/components/Timeline.jsx` |
| Photo gallery + lightbox | `src/components/Gallery.jsx` |
| Wax-sealed letter | `src/components/VintageLetter.jsx` |
| Time-locked "Future Us" vault | `src/components/FutureVault.jsx` |
| Ambient audio toggle | `src/components/AudioToggle.jsx` |
| All editable content | `src/content.js` |
| Colors, fonts, animations | `tailwind.config.js` |

The unlock state is remembered in the browser (`localStorage`) after a
correct answer, so she won't have to re-answer the question every time
she reopens the link on the same device.

Happy anniversary. 🕰️
