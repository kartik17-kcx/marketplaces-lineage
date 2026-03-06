import { NODE_W, NODE_H, TYPE_COLORS } from "../../data/initialData";
import { truncate } from "../../utils/helpers";

export default function GraphNode({
  node,
  position,
  isHovered,
  isSelected,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  if (!position) return null;

  const c = TYPE_COLORS[node.type];
  const showGlow = isSelected || isHovered;

  return (
    <g
      className="gnode"
      transform={`translate(${position.x},${position.y})`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        cursor: "pointer",
        opacity: isDimmed ? 0.12 : 1,
        transition: "opacity 0.2s ease",
      }}
    >
      {/* Main rect */}
      <rect
        width={NODE_W}
        height={NODE_H}
        rx={6}
        fill={c.bg}
        stroke={isSelected ? c.accent : isHovered ? c.text : c.border}
        strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 1}
      />

      {/* Glow ring */}
      {showGlow && (
        <rect
          width={NODE_W}
          height={NODE_H}
          rx={6}
          fill="none"
          stroke={c.accent}
          strokeWidth={1}
          opacity={0.3}
          style={{ filter: `drop-shadow(0 0 6px ${c.accent}44)` }}
        />
      )}

      {/* Schema pill */}
      <rect
        x={8}
        y={7}
        width={node.schema.length * 6.2 + 14}
        height={15}
        rx={3}
        fill={c.tag}
      />
      <text
        x={15}
        y={17.5}
        fill={c.tagText}
        fontSize={9}
        fontFamily="IBM Plex Mono"
        letterSpacing="0.03em"
      >
        {node.schema}
      </text>

      {/* Table name */}
      <text
        x={10}
        y={43}
        fill={c.text}
        fontSize={10.5}
        fontWeight={500}
        fontFamily="IBM Plex Mono"
      >
        {truncate(node.name, 30)}
      </text>

      {/* Description below node */}
      <text
        x={0}
        y={NODE_H + 14}
        fill={c.tagText}
        fontSize={8}
        fontFamily="IBM Plex Mono"
        opacity={0.6}
      >
        {truncate(node.desc || "", 46)}
      </text>

      {/* Left connector dot (for non-sources) */}
      {node.type !== "source" && (
        <circle
          cx={0}
          cy={NODE_H / 2}
          r={3}
          fill={c.dot}
          stroke={c.bg}
          strokeWidth={1.5}
        />
      )}

      {/* Right connector dot (for sources and intermediates) */}
      {(node.type === "source" || node.type === "intermediate") && (
        <circle
          cx={NODE_W}
          cy={NODE_H / 2}
          r={3}
          fill={c.dot}
          stroke={c.bg}
          strokeWidth={1.5}
        />
      )}
    </g>
  );
}
