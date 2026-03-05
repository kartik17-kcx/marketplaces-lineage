import { useMemo } from "react";

/**
 * Given a hovered node ID, walks the full upstream + downstream
 * lineage chain and returns the set of traced nodes and edges.
 */
export function useLineageTrace(hoveredId, edges) {
  return useMemo(() => {
    if (!hoveredId) {
      return { traceNodes: new Set(), traceEdges: new Set() };
    }

    const traceNodes = new Set([hoveredId]);
    const traceEdges = new Set();

    // Walk upstream (sources of this node)
    const walkUp = (id) => {
      edges.forEach((e) => {
        if (e.to === id && !traceNodes.has(e.from)) {
          traceNodes.add(e.from);
          traceEdges.add(`${e.from}-${e.to}`);
          walkUp(e.from);
        }
      });
    };

    // Walk downstream (consumers of this node)
    const walkDown = (id) => {
      edges.forEach((e) => {
        if (e.from === id && !traceNodes.has(e.to)) {
          traceNodes.add(e.to);
          traceEdges.add(`${e.from}-${e.to}`);
          walkDown(e.to);
        }
      });
    };

    walkUp(hoveredId);
    walkDown(hoveredId);

    // Also include direct edges to/from hovered node
    edges.forEach((e) => {
      if (e.from === hoveredId || e.to === hoveredId) {
        traceEdges.add(`${e.from}-${e.to}`);
      }
    });

    return { traceNodes, traceEdges };
  }, [hoveredId, edges]);
}
