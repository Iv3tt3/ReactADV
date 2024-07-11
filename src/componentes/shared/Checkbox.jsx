import PropTypes from "prop-types";

export default function CheckBox({ className, title, arrayInput }) {
  return (
    <div className={className}>
      <p>{title}</p>
      {arrayInput.map(({ label, id, ...props }) => (
        <div key={id}>
          <label>
            {label}
            <input type="checkbox" {...props}></input>
          </label>
        </div>
      ))}
    </div>
  );
}

CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  arrayInput: PropTypes.array,
};
