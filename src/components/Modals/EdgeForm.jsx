import { useState } from "react";
import FormField from "../UI/FormField";
import "./Forms.css";

export default function EdgeForm({ nodes, onSave, onCancel }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const sources = nodes.filter(
    (n) => n.type === "source" || n.type === "intermediate"
  );
  const targets = nodes.filter(
    (n) => n.type === "intermediate" || n.type === "mart"
  );

  const canSave = from && to && from !== to;

  const handleSave = () => {
    if (canSave) onSave({ from, to });
  };

  return (
    <div>
      <FormField
        label="From (Source / Intermediate)"
        value={from}
        onChange={setFrom}
        select
        options={[
          { value: "", label: "— Select —" },
          ...sources.map((n) => ({
            value: n.id,
            label: `${n.schema}.${n.name}`,
          })),
        ]}
      />
      <FormField
        label="To (Intermediate / Mart)"
        value={to}
        onChange={setTo}
        select
        options={[
          { value: "", label: "— Select —" },
          ...targets.map((n) => ({
            value: n.id,
            label: `${n.schema}.${n.name}`,
          })),
        ]}
      />

      <div className="form-actions">
        <button
          className={`btn ${canSave ? "btn--primary" : "btn--disabled"}`}
          onClick={handleSave}
          disabled={!canSave}
        >
          Add Connection
        </button>
        <button className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
