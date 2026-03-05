import { useState, useCallback } from "react";
import { INITIAL_NODES, INITIAL_EDGES } from "../data/initialData";

/**
 * Central state for nodes and edges, with CRUD operations.
 */
export function useLineageState() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);

  const addOrUpdateNode = useCallback(
    (node) => {
      setNodes((prev) => {
        const filtered = prev.filter((n) => n.id !== node.id);
        return [...filtered, node];
      });
    },
    []
  );

  const deleteNode = useCallback((id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.from !== id && e.to !== id));
  }, []);

  const addEdge = useCallback((edge) => {
    setEdges((prev) => {
      const exists = prev.some(
        (e) => e.from === edge.from && e.to === edge.to
      );
      return exists ? prev : [...prev, edge];
    });
  }, []);

  const deleteEdge = useCallback((from, to) => {
    setEdges((prev) => prev.filter((e) => !(e.from === from && e.to === to)));
  }, []);

  // ── Derived counts ──
  const counts = {
    sources: nodes.filter((n) => n.type === "source").length,
    transforms: nodes.filter((n) => n.type === "intermediate").length,
    marts: nodes.filter((n) => n.type === "mart").length,
    deprecated: nodes.filter((n) => n.type === "deprecated").length,
    edges: edges.length,
  };

  return {
    nodes,
    edges,
    counts,
    addOrUpdateNode,
    deleteNode,
    addEdge,
    deleteEdge,
  };
}
