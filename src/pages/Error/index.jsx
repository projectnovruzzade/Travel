import { Link } from "react-router-dom";
import "./style.scss";

const Error = () => {
  return (
    <section id="error-page">
      <h1 className="error-code">404</h1>
      <p className="error-message">Page not found</p>
      <Link to="/" className="error-link">Back to Home</Link>
    </section>
  );
};

export default Error;
