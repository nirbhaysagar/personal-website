# Personal Blueprint Website & Life Map

A high-contrast, pure white monochrome personal operating system and blueprint website.

## Blueprint Design System
- **Colors**: Strict monochrome — pure white background (`#FFFFFF`), pure black ink (`#000000`), zero extraneous colors.
- **Typography**:
  - Headings: **Helvetica** with top & bottom blueprint framing rules (`border-top: 1px solid #000; border-bottom: 1px solid #000;`).
  - Content, Metrics & Logs: **IBM Plex Mono**.
- **Blueprint Mode**: Corner registration marks (`+ [00:00:00]`), hairline grids, status indicators, and SVG/ASCII progress meters.

## Included Modules
1. **Header / Identity**: Name, age, role, 4-line manifesto/description, live UTC telemetry, and quick navigation anchors.
2. **01: What I Am Currently Doing**: Current focus headline, deep work details, and daily protocol cadence.
3. **02: Current Projects & Builds**: Project cards with tech stack tags, status badges, and progress bars.
4. **03: Targets & Measurable Progress**:
   - **September 2026 Targets**: Time remaining counter, month elapsed gauge, completion %, and targets table with visual progress meters.
   - **5-Year Horizon (2026–2031)**: Milestone roadmap graph across 5 years with progress bars and checkbox indicators.
5. **04: The Bucket List**: Interactive checklist with local persistence (localStorage). Click any item to check/uncheck.
6. **05: Daily Input ("What I Learned Today")**: Live logger form with instant entry addition, persistent local storage, and a 1-click **Export as Markdown** button.

## Running Locally

To run the local server with Bun:
```bash
bun run server.ts
```
Then open your browser to `http://localhost:3000`.

Alternatively, you can open `index.html` directly in any web browser.

## Customizing Your Data
All data (your name, age, bio, projects, targets, bucket list items, and seed logs) is cleanly organized in `js/data.js`. You can edit that file directly at any time.
