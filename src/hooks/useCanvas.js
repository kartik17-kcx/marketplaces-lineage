import { useState, useCallback, useEffect, useRef } from "react";

const ZOOM_MIN = 0.2;
const ZOOM_MAX = 2.0;
const ZOOM_STEP_WHEEL = 0.04;
const ZOOM_STEP_BUTTON = 0.08;
const ZOOM_DEFAULT = 0.62;

/**
 * Handles pan/zoom/drag state for the SVG canvas.
 * Returns refs, state, and event handlers.
 */
export function useCanvas() {
  const svgRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // ── Mouse wheel zoom ──
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP_WHEEL : ZOOM_STEP_WHEEL;
    setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z + delta)));
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (el) el.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // ── Pan via drag ──
  const onMouseDown = useCallback(
    (e) => {
      // Don't start drag if clicking a node
      if (e.target.closest(".gnode")) return;
      setDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    },
    [pan]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging) return;
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [dragging, dragStart]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  // ── Button controls ──
  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP_BUTTON)),
    []
  );
  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP_BUTTON)),
    []
  );
  const resetView = useCallback(() => {
    setZoom(ZOOM_DEFAULT);
    setPan({ x: 0, y: 0 });
  }, []);

  return {
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
  };
}
