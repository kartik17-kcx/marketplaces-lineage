import "./FormField.css";

export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  select,
  options,
}) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>

      {select ? (
        <select
          className="form-field__input form-field__select"
          value={value}
          onChange={handleChange}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          className="form-field__input form-field__textarea"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          className="form-field__input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
