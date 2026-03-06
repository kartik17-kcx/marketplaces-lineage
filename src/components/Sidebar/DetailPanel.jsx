import { TYPE_COLORS } from "../../data/initialData";
import { truncate } from "../../utils/helpers";
import "./Sidebar.css";

export default function DetailPanel({
  node,
  upstream,
  downstream,
  onEdit,
  onDelete,
  onDeleteEdge,
}) {
  if (!node) return null;

  const c = TYPE_COLORS[node.type];

  return (
    <div className="detail-panel">
      {/* Header row */}
      <div className="detail-panel__header">
        <div>
          <span
            className="detail-panel__type-tag"
            style={{ background: c.tag, color: c.tagText }}
          >
            {node.type}
          </span>
          <div className="detail-panel__name" style={{ color: c.text }}>
            {node.name}
          </div>
        </div>
        <div className="detail-panel__actions">
          <button className="detail-panel__btn" onClick={onEdit}>
            Edit
          </button>
          <button
            className="detail-panel__btn detail-panel__btn--danger"
            onClick={() => {
              if (confirm("Delete this node and all its connections?"))
                onDelete(node.id);
            }}
          >
            Del
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="detail-panel__meta">
        {node.schema}
      </div>
      <div className="detail-panel__desc">{node.desc}</div>

      {/* Upstream */}
      {upstream.length > 0 && (
        <div className="detail-panel__section">
          <div className="detail-panel__section-title">UPSTREAM</div>
          {upstream.map((n) => (
            <div key={n.id} className="detail-panel__edge-row">
              <span style={{ color: TYPE_COLORS[n.type].text, fontSize: 10 }}>
                {truncate(n.name, 28)}
              </span>
              <button
                className="detail-panel__edge-remove"
                onClick={() => onDeleteEdge(n.id, node.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Downstream */}
      {downstream.length > 0 && (
        <div className="detail-panel__section">
          <div className="detail-panel__section-title">DOWNSTREAM</div>
          {downstream.map((n) => (
            <div key={n.id} className="detail-panel__edge-row">
              <span style={{ color: TYPE_COLORS[n.type].text, fontSize: 10 }}>
                {truncate(n.name, 28)}
              </span>
              <button
                className="detail-panel__edge-remove"
                onClick={() => onDeleteEdge(node.id, n.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
