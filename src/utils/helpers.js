import { NODE_W, NODE_H } from "../data/initialData";

/**
 * Truncate a string with ellipsis
 */
export function truncate(str, len = 30) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len - 1) + "…" : str;
}

/**
 * Get anchor point on left or right side of a node
 */
export function getAnchor(pos, side) {
  if (!pos) return { x: 0, y: 0 };
  return side === "right"
    ? { x: pos.x + NODE_W, y: pos.y + NODE_H / 2 }
    : { x: pos.x, y: pos.y + NODE_H / 2 };
}

/**
 * Generate a cubic bezier path between two points
 */
export function edgePath(from, to) {
  const dx = to.x - from.x;
  const cp = Math.max(dx * 0.45, 60);
  return `M${from.x},${from.y} C${from.x + cp},${from.y} ${to.x - cp},${to.y} ${to.x},${to.y}`;
}

/**
 * Generate a unique ID from a table name
 */
export function nameToId(name) {
  return name.replace(/[^a-z0-9_]/gi, "_").toLowerCase();
}
