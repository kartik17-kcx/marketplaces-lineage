import { TYPE_COLORS } from "../../data/initialData";
import { truncate } from "../../utils/helpers";
import "./Sidebar.css";

export default function NodeListItem({
  node,
  isSelected,
  onClick,
  onHover,
  onLeave,
}) {
  const c = TYPE_COLORS[node.type];

  return (
    <div
      className={`node-list-item ${isSelected ? "node-list-item--selected" : ""}`}
      style={{
        borderColor: isSelected ? c.border : "transparent",
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="node-list-item__header">
        <span className="node-list-item__name" style={{ color: c.text }}>
          {truncate(node.name, 32)}
        </span>
        {node.size && (
          <span className="node-list-item__size">{node.size}</span>
        )}
      </div>
      <div className="node-list-item__desc">
        {truncate(node.desc || "", 60)}
      </div>
    </div>
  );
}
