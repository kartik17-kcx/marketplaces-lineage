import { useState } from "react";
import { CATEGORY_LABELS } from "../../data/initialData";
import { nameToId } from "../../utils/helpers";
import FormField from "../UI/FormField";
import "./Forms.css";

const TYPE_OPTIONS = [
  { value: "source", label: "Source" },
  { value: "intermediate", label: "Intermediate (DBT)" },
  { value: "mart", label: "Mart (DBT)" },
  { value: "deprecated", label: "Deprecated" },
];

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([v, l]) => ({
  value: v,
  label: l,
}));

export default function NodeForm({ node, onSave, onCancel }) {
  const [form, setForm] = useState(
    node || {
      schema: "marketplaces",
      name: "",
      type: "source",
      desc: "",
      category: "amazon_sp",
    }
  );

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    const id = form.id || nameToId(form.name);
    onSave({ ...form, id });
  };

  return (
    <div>
      <FormField
        label="Type"
        value={form.type}
        onChange={(v) => set("type", v)}
        select
        options={TYPE_OPTIONS}
      />
      <FormField
        label="Schema"
        value={form.schema}
        onChange={(v) => set("schema", v)}
        placeholder="e.g. marketplaces"
      />
      <FormField
        label="Table Name"
        value={form.name}
        onChange={(v) => set("name", v)}
        placeholder="e.g. amazon_sp_report"
      />
      {form.type === "source" && (
        <FormField
          label="Category"
          value={form.category || "amazon_sp"}
          onChange={(v) => set("category", v)}
          select
          options={CATEGORY_OPTIONS}
        />
      )}
      <FormField
        label="Description"
        value={form.desc}
        onChange={(v) => set("desc", v)}
        textarea
        placeholder="One-liner description…"
      />

      <div className="form-actions">
        <button className="btn btn--primary" onClick={handleSave}>
          {node ? "Update" : "Add Node"}
        </button>
        <button className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
