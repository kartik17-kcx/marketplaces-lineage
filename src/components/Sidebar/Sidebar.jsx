import { useState, useMemo } from "react";
import { SIDEBAR_TABS, CATEGORY_LABELS } from "../../data/initialData";
import NodeListItem from "./NodeListItem";
import DetailPanel from "./DetailPanel";
import "./Sidebar.css";

export default function Sidebar({
  nodes,
  edges,
  counts,
  selected,
  onSelect,
  onHover,
  onLeave,
  onOpenAddNode,
  onOpenAddEdge,
  onOpenEditNode,
  onDeleteNode,
  onDeleteEdge,
}) {
  const [activeTab, setActiveTab] = useState("sources");
  const [searchQ, setSearchQ] = useState("");

  // ── Filter nodes for current tab ──
  const tabConfig = SIDEBAR_TABS.find((t) => t.key === activeTab);
  const filteredNodes = useMemo(() => {
    if (!tabConfig) return [];
    return nodes.filter(
      (n) =>
        n.type === tabConfig.typeFilter &&
        (!searchQ ||
          n.name.toLowerCase().includes(searchQ.toLowerCase()) ||
          n.desc?.toLowerCase().includes(searchQ.toLowerCase()))
    );
  }, [nodes, tabConfig, searchQ]);

  // ── Selected node detail ──
  const selectedNode = selected
    ? nodes.find((n) => n.id === selected)
    : null;
  const upstream = selected
    ? edges
        .filter((e) => e.to === selected)
        .map((e) => nodes.find((n) => n.id === e.from))
        .filter(Boolean)
    : [];
  const downstream = selected
    ? edges
        .filter((e) => e.from === selected)
        .map((e) => nodes.find((n) => n.id === e.to))
        .filter(Boolean)
    : [];

  // ── Group sources by category ──
  const renderNodeList = () => {
    if (activeTab === "sources") {
      const categories = [
        ...new Set(filteredNodes.map((n) => n.category)),
      ];
      return categories.map((cat) => (
        <div key={cat} className="sidebar__category-group">
          <div className="sidebar__category-label">
            {CATEGORY_LABELS[cat] || cat}
          </div>
          {filteredNodes
            .filter((n) => n.category === cat)
            .map((n) => (
              <NodeListItem
                key={n.id}
                node={n}
                isSelected={selected === n.id}
                onClick={() => onSelect(n.id)}
                onHover={() => onHover(n.id)}
                onLeave={onLeave}
              />
            ))}
        </div>
      ));
    }

    return filteredNodes.map((n) => (
      <NodeListItem
        key={n.id}
        node={n}
        isSelected={selected === n.id}
        onClick={() => onSelect(n.id)}
        onHover={() => onHover(n.id)}
        onLeave={onLeave}
      />
    ));
  };

  return (
    <aside className="sidebar">
      {/* ── Logo ── */}
      <div className="sidebar__brand">
        <div className="sidebar__logo-icon">⬡</div>
        <div>
          <div className="sidebar__brand-title">Lineage Manager</div>
          <div className="sidebar__brand-sub">MARKETPLACES DWH</div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="sidebar__tabs">
        {SIDEBAR_TABS.map((t) => {
          const count = counts[t.key] ?? 0;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              className={`sidebar__tab ${isActive ? "sidebar__tab--active" : ""}`}
              onClick={() => {
                setActiveTab(t.key);
                setSearchQ("");
              }}
            >
              <span className="sidebar__tab-icon">{t.icon}</span>
              <span>{t.key.toUpperCase()}</span>
              <span
                className="sidebar__tab-count"
                style={{ color: isActive ? "#388bfd" : "#30363d" }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Action buttons ── */}
      <div className="sidebar__actions">
        <button className="sidebar__action-btn" onClick={onOpenAddNode}>
          + Node
        </button>
        <button className="sidebar__action-btn" onClick={onOpenAddEdge}>
          + Edge
        </button>
      </div>

      {/* ── Search ── */}
      <div className="sidebar__search">
        <input
          className="sidebar__search-input"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search tables…"
        />
      </div>

      {/* ── Node list ── */}
      <div className="sidebar__list">{renderNodeList()}</div>

      {/* ── Detail panel ── */}
      {selectedNode && (
        <DetailPanel
          node={selectedNode}
          upstream={upstream}
          downstream={downstream}
          onEdit={() => onOpenEditNode(selectedNode)}
          onDelete={onDeleteNode}
          onDeleteEdge={onDeleteEdge}
        />
      )}
    </aside>
  );
}
