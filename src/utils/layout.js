import {
  NODE_H,
  COL_GAP,
  ROW_GAP,
  GROUP_GAP,
  START_X,
  START_Y,
} from "../data/initialData";

const CATEGORY_ORDER = [
  "amazon_sp",
  "amazon_sb",
  "amazon_sd",
  "amazon_txn",
  "amazon_other",
  "meta",
  "shopify",
  "mapping",
  "utility",
];

/**
 * Compute { [nodeId]: { x, y } } positions for every node.
 *
 * Sources are stacked vertically grouped by category.
 * Intermediates/marts are center-aligned to their upstream average.
 * Overlap resolution runs on each non-source column.
 */
export function computeLayout(nodes, edges) {
  const positions = {};

  const colX = {
    source: START_X,
    intermediate: START_X + COL_GAP,
    mart: START_X + COL_GAP * 2,
    deprecated: START_X + COL_GAP * 3,
  };

  // ── Sources: grouped by category ──
  const sources = nodes.filter((n) => n.type === "source");
  let y = START_Y;

  CATEGORY_ORDER.forEach((cat) => {
    const group = sources.filter((s) => s.category === cat);
    if (group.length === 0) return;

    group.forEach((s) => {
      positions[s.id] = { x: colX.source, y };
      y += NODE_H + ROW_GAP;
    });

    y += GROUP_GAP; // extra space between categories
  });

  // ── Helper: position a column by averaging upstream positions ──
  const positionColumn = (columnNodes, xKey) => {
    columnNodes.forEach((n, i) => {
      const upstreamPositions = edges
        .filter((e) => e.to === n.id)
        .map((e) => positions[e.from])
        .filter(Boolean);

      const avgY =
        upstreamPositions.length > 0
          ? upstreamPositions.reduce((s, p) => s + p.y, 0) /
            upstreamPositions.length
          : START_Y + i * (NODE_H + ROW_GAP + 30);

      positions[n.id] = { x: colX[xKey], y: avgY };
    });

    // Resolve overlaps
    const sorted = [...columnNodes].sort(
      (a, b) => (positions[a.id]?.y || 0) - (positions[b.id]?.y || 0)
    );

    for (let i = 1; i < sorted.length; i++) {
      const prev = positions[sorted[i - 1].id];
      const curr = positions[sorted[i].id];
      if (curr && prev && curr.y < prev.y + NODE_H + ROW_GAP + 10) {
        curr.y = prev.y + NODE_H + ROW_GAP + 10;
      }
    }
  };

  // ── Intermediates ──
  positionColumn(
    nodes.filter((n) => n.type === "intermediate"),
    "intermediate"
  );

  // ── Marts ──
  positionColumn(
    nodes.filter((n) => n.type === "mart"),
    "mart"
  );

  // ── Deprecated ──
  const deprecated = nodes.filter((n) => n.type === "deprecated");
  deprecated.forEach((n, i) => {
    positions[n.id] = {
      x: colX.deprecated,
      y: START_Y + i * (NODE_H + ROW_GAP + 20),
    };
  });

  return positions;
}

/**
 * Compute canvas bounds from positions
 */
export function getCanvasBounds(positions) {
  const allPos = Object.values(positions);
  if (allPos.length === 0) return { width: 1200, height: 800 };

  return {
    width: Math.max(1200, Math.max(...allPos.map((p) => p.x)) + 500),
    height: Math.max(800, Math.max(...allPos.map((p) => p.y)) + 200),
  };
}
