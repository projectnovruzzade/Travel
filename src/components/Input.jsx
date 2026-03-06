import "./components.scss";

/**
 * Reusable Input component
 *
 * Props:
 *  - label      {string}           — Field label displayed above input
 *  - placeholder{string}           — Input placeholder text
 *  - icon       {React.Component}  — Optional SVG icon rendered on the left
 *  - size       {"sm"|"md"|"lg"}   — Input height variant (default: "md")
 *  - type       {"text"|"select"}  — Input type (default: "text")
 *  - options    {Array<{value, label}>} — Options list for select type
 *  - value      {string}           — Controlled value
 *  - onChange   {Function}         — Change handler (e) => void
 *  - ...rest    — Any extra props forwarded to the native element
 */
const Input = ({
  label,
  placeholder = "",
  icon: Icon,
  size = "md",
  type = "text",
  options = [],
  value,
  onChange,
  ...rest
}) => {
  const wrapperClass = `input-wrapper input-wrapper--${size}${Icon ? " input-wrapper--icon" : ""}`;

  return (
    <div className="input-field">
      {label && <label className="input-label">{label}</label>}

      <div className={wrapperClass}>
        {Icon && (
          <span className="input-icon">
            <Icon />
          </span>
        )}

        {type === "select" ? (
          <select
            className={`input-base input-select input--${size}`}
            value={value}
            onChange={onChange}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`input-base input--${size}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
