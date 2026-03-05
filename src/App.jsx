import { useState } from "react";
import { useLineageState } from "./hooks/useLineageState";
import Sidebar from "./components/Sidebar/Sidebar";
import Canvas from "./components/Canvas/Canvas";
import Modal from "./components/Modals/Modal";
import NodeForm from "./components/Modals/NodeForm";
import EdgeForm from "./components/Modals/EdgeForm";
import "./App.css";

export default function App() {
  const {
    nodes,
    edges,
    counts,
    addOrUpdateNode,
    deleteNode,
    addEdge,
    deleteEdge,
  } = useLineageState();

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // null | "addNode" | "editNode" | "addEdge"
  const [editTarget, setEditTarget] = useState(null);

  // ── Modal handlers ──
  const openAddNode = () => {
    setEditTarget(null);
    setModal("addNode");
  };

  const openEditNode = (node) => {
    setEditTarget(node);
    setModal("addNode");
  };

  const openAddEdge = () => setModal("addEdge");

  const closeModal = () => {
    setModal(null);
    setEditTarget(null);
  };

  const handleSaveNode = (node) => {
    addOrUpdateNode(node);
    closeModal();
  };

  const handleSaveEdge = (edge) => {
    addEdge(edge);
    closeModal();
  };

  const handleDeleteNode = (id) => {
    deleteNode(id);
    setSelected(null);
  };

  // ── Select handler syncs sidebar tab ──
  const handleSelect = (id) => {
    setSelected(id);
    setHovered(null);
  };

  return (
    <div className="app-root">
      <Sidebar
        nodes={nodes}
        edges={edges}
        counts={counts}
        selected={selected}
        onSelect={handleSelect}
        onHover={setHovered}
        onLeave={() => setHovered(null)}
        onOpenAddNode={openAddNode}
        onOpenAddEdge={openAddEdge}
        onOpenEditNode={openEditNode}
        onDeleteNode={handleDeleteNode}
        onDeleteEdge={deleteEdge}
      />

      <Canvas
        nodes={nodes}
        edges={edges}
        counts={counts}
        hovered={hovered}
        selected={selected}
        onHover={setHovered}
        onLeave={() => setHovered(null)}
        onSelect={handleSelect}
      />

      {/* ── Modals ── */}
      <Modal
        isOpen={modal === "addNode"}
        onClose={closeModal}
        title={editTarget ? "Edit Node" : "Add Node"}
      >
        <NodeForm
          node={editTarget}
          onSave={handleSaveNode}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        isOpen={modal === "addEdge"}
        onClose={closeModal}
        title="Add Lineage Connection"
      >
        <EdgeForm
          nodes={nodes}
          onSave={handleSaveEdge}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
