// ============================================================================
// CROSS-STITCH PIXEL MATRIX ENGINE (INSPIRED BY KOTO UNIQODE BRANDING)
// Renders genuine woven cross-stitch '✕' glyphs on an architectural grid.
// ============================================================================

const GLYPH_MAP_7X5 = {
  'B': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ],
  'O': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0]
  ],
  'L': [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1]
  ],
  'D': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ],
  ' ': [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
};

export function renderCrossStitchSVG(text, options = {}) {
  const cellSize = options.cellSize || 14;
  const strokeWidth = options.strokeWidth || 3.2;
  const color = options.color || '#ffffff';
  const letterSpacing = options.letterSpacing || 2; // grid units

  const chars = text.toUpperCase().split('');
  let totalCols = 0;
  chars.forEach(ch => {
    const glyph = GLYPH_MAP_7X5[ch] || GLYPH_MAP_7X5['B'];
    totalCols += glyph[0].length + letterSpacing;
  });
  totalCols -= letterSpacing;

  const width = totalCols * cellSize;
  const height = 7 * cellSize;

  let stitches = '';
  let currentCol = 0;

  chars.forEach(ch => {
    const glyph = GLYPH_MAP_7X5[ch];
    if (!glyph) return;

    for (let r = 0; r < glyph.length; r++) {
      for (let c = 0; c < glyph[r].length; c++) {
        if (glyph[r][c] === 1) {
          const x = (currentCol + c) * cellSize;
          const y = r * cellSize;
          const pad = cellSize * 0.12;

          // Render cross stitch '✕' (two diagonal thread lines)
          stitches += `
            <line x1="${x + pad}" y1="${y + pad}" x2="${x + cellSize - pad}" y2="${y + cellSize - pad}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" />
            <line x1="${x + cellSize - pad}" y1="${y + pad}" x2="${x + pad}" y2="${y + cellSize - pad}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" />
          `;
        }
      }
    }
    currentCol += glyph[0].length + letterSpacing;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="display: block; max-width: 100%; height: auto;" xmlns="http://www.w3.org/2000/svg">
      ${stitches}
    </svg>
  `;
}
