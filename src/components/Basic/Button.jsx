import "./Button.css";

export default function Button({ children, ...props }) {
  return (
    <>
      {/* A propriedade onClick do componente button é trazida da chamada do componente */}
      <button className="button" {...props}>
        {children}
      </button>
    </>
  );
}
