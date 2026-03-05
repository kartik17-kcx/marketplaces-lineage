import { TYPE_COLORS } from "../../data/initialData";
import { truncate } from "../../utils/helpers";
import "./NodePopup.css";

export default function NodePopup({ node, upstream, downstream, onClose }) {
  if (!node) return null;

  const c = TYPE_COLORS[node.type];

  return (
    <div
      className="node-popup"
      style={{ borderColor: c.border }}
    >
      {/* Close button */}
      <button className="node-popup__close" onClick={onClose}>✕</button>

      {/* Type + schema row */}
      <div className="node-popup__tags">
        <span
          className="node-popup__type-pill"
          style={{ background: c.tag, color: c.tagText }}
        >
          {node.type}
        </span>
        <span className="node-popup__schema">{node.schema}</span>
        {node.size && <span className="node-popup__size">{node.size}</span>}
      </div>

      {/* Name */}
      <div className="node-popup__name" style={{ color: c.text }}>
        {node.name}
      </div>

      {/* Description */}
      <div className="node-popup__desc">{node.desc}</div>

      {/* Lineage info */}
      {upstream.length > 0 && (
        <div className="node-popup__section">
          <div className="node-popup__section-title">
            <span className="node-popup__arrow">←</span> UPSTREAM ({upstream.length})
          </div>
          <div className="node-popup__node-list">
            {upstream.map((n) => (
              <span
                key={n.id}
                className="node-popup__node-chip"
                style={{
                  borderColor: TYPE_COLORS[n.type].border,
                  color: TYPE_COLORS[n.type].text,
                }}
              >
                {truncate(n.name, 32)}
              </span>
            ))}
          </div>
        </div>
      )}

      {downstream.length > 0 && (
        <div className="node-popup__section">
          <div className="node-popup__section-title">
            DOWNSTREAM ({downstream.length}) <span className="node-popup__arrow">→</span>
          </div>
          <div className="node-popup__node-list">
            {downstream.map((n) => (
              <span
                key={n.id}
                className="node-popup__node-chip"
                style={{
                  borderColor: TYPE_COLORS[n.type].border,
                  color: TYPE_COLORS[n.type].text,
                }}
              >
                {truncate(n.name, 32)}
              </span>
            ))}
          </div>
        </div>
      )}

      {upstream.length === 0 && downstream.length === 0 && (
        <div className="node-popup__orphan">No lineage connections</div>
      )}
    </div>
  );
}
