import { forwardRef } from "react";
import PropTypes from "prop-types";

const FormField = forwardRef(({ className, label, ...props}, ref) => {
  return (
    <div className={className}>
      <label>
        <span>{label}</span>
        <input
          className="formField-input"
          autoComplete="off"
          {...props}
          ref={ref}
        />
      </label>
    </div>
  );
});

FormField.displayName = "FormField";

FormField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

export default FormField;
