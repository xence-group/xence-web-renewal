# XENCE website renewal (proposal)

Static build of the renewal proposal (JA at `/`, EN at `/en/`).

- `index.html`, `en/` – pages (Preact + htm, no build step)
- `assets/` – images and videos
- `src/` – generator (`gen.py`, `template.html`) and `convert.py` that turns the design-canvas files into this static site

Pages carry `noindex` until the content is approved.
