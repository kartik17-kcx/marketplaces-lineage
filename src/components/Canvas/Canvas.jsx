import { useMemo } from "react";
import { NODE_W, COL_GAP, TYPE_COLORS } from "../../data/initialData";
import { computeLayout, getCanvasBounds } from "../../utils/layout";
import { useCanvas } from "../../hooks/useCanvas";
import { useLineageTrace } from "../../hooks/useLineageTrace";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import NodePopup from "./NodePopup";
import "./Canvas.css";

const START_X = 40;

export default function Canvas({
  nodes,
  edges,
  counts,
  hovered,
  selected,
  onHover,
  onLeave,
  onSelect,
}) {
  const {
    svgRef,
    pan,
    zoom,
    dragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    zoomIn,
    zoomOut,
    resetView,
  } = useCanvas();

  const positions = useMemo(() => computeLayout(nodes, edges), [nodes, edges]);
  const bounds = useMemo(() => getCanvasBounds(positions), [positions]);
  const { traceNodes, traceEdges } = useLineageTrace(hovered, edges);

  // ── Selected node detail for popup ──
  const selectedNode = selected ? nodes.find((n) => n.id === selected) : null;
  const selectedUpstream = useMemo(() => {
    if (!selected) return [];
    return edges
      .filter((e) => e.to === selected)
      .map((e) => nodes.find((n) => n.id === e.from))
      .filter(Boolean);
  }, [selected, edges, nodes]);
  const selectedDownstream = useMemo(() => {
    if (!selected) return [];
    return edges
      .filter((e) => e.from === selected)
      .map((e) => nodes.find((n) => n.id === e.to))
      .filter(Boolean);
  }, [selected, edges, nodes]);

  const columnHeaders = [
    {
      x: START_X + NODE_W / 2,
      label: "DATA SOURCES",
      sub: `${counts.sources} tables`,
    },
    {
      x: START_X + COL_GAP + NODE_W / 2,
      label: "DBT TRANSFORMS",
      sub: `${counts.transforms} models`,
    },
    {
      x: START_X + COL_GAP * 2 + NODE_W / 2,
      label: "ANALYTICAL MARTS",
      sub: `${counts.marts} outputs`,
    },
  ];

  return (
    <div
      className="canvas"
      style={{ cursor: dragging ? "grabbing" : "grab" }}
    >
      {/* ── Stats bar ── */}
      <div className="canvas__stats">
        {[
          { label: "Sources", count: counts.sources, color: "#8b949e" },
          { label: "Transforms", count: counts.transforms, color: "#58a6ff" },
          { label: "Marts", count: counts.marts, color: "#3fb950" },
          { label: "Connections", count: counts.edges, color: "#d2a8ff" },
        ].map((s) => (
          <div key={s.label} className="canvas__stat-item">
            <span className="canvas__stat-count" style={{ color: s.color }}>
              {s.count}
            </span>
            <span className="canvas__stat-label">
              {s.label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* ── Legend ── */}
      <div className="canvas__legend">
        {Object.entries(TYPE_COLORS).map(([type, c]) => (
          <div key={type} className="canvas__legend-item">
            <div
              className="canvas__legend-dot"
              style={{ borderColor: c.border, background: c.bg }}
            />
            <span style={{ color: c.text }}>{type.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* ── Zoom controls ── */}
      <div className="canvas__zoom">
        <button className="canvas__zoom-btn" onClick={zoomOut}>
          −
        </button>
        <button
          className="canvas__zoom-btn canvas__zoom-btn--wide"
          onClick={resetView}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button className="canvas__zoom-btn" onClick={zoomIn}>
          +
        </button>
      </div>

      {/* ── SVG ── */}
      <svg
        ref={svgRef}
        className="canvas__svg"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={() => onSelect(null)}
      >
        <defs>
          <marker
            id="ah-dim"
            viewBox="0 0 8 6"
            refX="8"
            refY="3"
            markerWidth="7"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill="#21262d" />
          </marker>
          <marker
            id="ah-blue"
            viewBox="0 0 8 6"
            refX="8"
            refY="3"
            markerWidth="7"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill="#388bfd" />
          </marker>
          <marker
            id="ah-green"
            viewBox="0 0 8 6"
            refX="8"
            refY="3"
            markerWidth="7"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill="#3fb950" />
          </marker>
          <pattern
            id="grid-dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.5" fill="#161b2244" />
          </pattern>
        </defs>

        <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
          {/* Background grid */}
          <rect
            x={-500}
            y={-200}
            width={bounds.width + 1000}
            height={bounds.height + 400}
            fill="url(#grid-dots)"
          />

          {/* Column headers */}
          {columnHeaders.map((col) => (
            <g key={col.label}>
              <text
                x={col.x}
                y={22}
                textAnchor="middle"
                fill="#21262d"
                fontSize={10}
                fontFamily="IBM Plex Mono"
                fontWeight={600}
                letterSpacing="0.14em"
              >
                {col.label}
              </text>
              <text
                x={col.x}
                y={36}
                textAnchor="middle"
                fill="#161b22"
                fontSize={9}
                fontFamily="IBM Plex Mono"
              >
                {col.sub}
              </text>
            </g>
          ))}

          {/* Edges */}
          {edges.map((edge) => (
            <GraphEdge
              key={`${edge.from}-${edge.to}`}
              edge={edge}
              positions={positions}
              nodes={nodes}
              isTraced={traceEdges.has(`${edge.from}-${edge.to}`)}
              hasHover={!!hovered}
            />
          ))}

          {/* Nodes */}
          {nodes.map((node) => (
            <GraphNode
              key={node.id}
              node={node}
              position={positions[node.id]}
              isHovered={hovered === node.id}
              isSelected={selected === node.id}
              isDimmed={!!hovered && !traceNodes.has(node.id)}
              onMouseEnter={() => onHover(node.id)}
              onMouseLeave={onLeave}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(node.id);
              }}
            />
          ))}
        </g>
      </svg>

      {/* ── Node detail popup ── */}
      <NodePopup
        node={selectedNode}
        upstream={selectedUpstream}
        downstream={selectedDownstream}
        onClose={() => onSelect(null)}
      />
    </div>
  );
}
