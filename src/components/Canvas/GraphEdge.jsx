import { getAnchor, edgePath } from "../../utils/helpers";

export default function GraphEdge({
  edge,
  positions,
  nodes,
  isTraced,
  hasHover,
}) {
  const fromPos = positions[edge.from];
  const toPos = positions[edge.to];
  if (!fromPos || !toPos) return null;

  const from = getAnchor(fromPos, "right");
  const to = getAnchor(toPos, "left");
  const toNode = nodes.find((n) => n.id === edge.to);

  const isMartTarget = toNode?.type === "mart";
  const color = isTraced
    ? isMartTarget
      ? "#3fb950"
      : "#388bfd"
    : "#21262d";
  const arrowId = isTraced
    ? isMartTarget
      ? "ah-green"
      : "ah-blue"
    : "ah-dim";

  return (
    <path
      d={edgePath(from, to)}
      fill="none"
      stroke={color}
      strokeWidth={isTraced ? 1.8 : 0.8}
      strokeOpacity={hasHover ? (isTraced ? 1 : 0.1) : 0.5}
      markerEnd={`url(#${arrowId})`}
      style={{ transition: "all 0.2s ease" }}
    />
  );
}
