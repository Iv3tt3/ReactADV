import PropTypes from "prop-types";

export default function RadioButton({ className, name, title, arrayInput }) {
  return (
    <div className={className}>
      <p>{title}</p>
      {arrayInput.map(({ label, id, ...props }) => (
        <div key={id}>
          <label>
            {label}
            <input type="radio" name={name} {...props}></input>
          </label>
        </div>
      ))}
    </div>
  );
}

RadioButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  arrayInput: PropTypes.array,
};
