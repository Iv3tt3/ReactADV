import PropTypes from "prop-types";

export default function NotificationMSG({ className, msg, ...props }) {
  return (
    <div className={className} {...props}>
      <p>{msg}</p>
    </div>
  );
}

NotificationMSG.propTypes = {
  className: PropTypes.string,
  msg: PropTypes.string,
};
