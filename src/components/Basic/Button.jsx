import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ children, ...props }) {
  Button.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      {/* A propriedade onClick do componente button é trazida da chamada do componente */}
      <button className="button" {...props}>
        {children}
      </button>
    </>
  );
}
