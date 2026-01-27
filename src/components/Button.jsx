import React from "react";
import "./components.scss";

const Button = ({ content, bg_color, text_color }) => {
  const colors = {
    yellowMain: "#D79A4D",
    yellowText: "#AC7B3E",
    secondaryText: "#505050",
    secondaryBtn: "#7C7C7C",

    blueDark: "#0A1030",
    blueButton: "#1D3557",
    blueOriginal: "#155DFC",
    blueSecondary: "#DBEAFE",
    blueText: "#1447E6",

    greenOriginal: "#00A63E",
  };

  return (
    <button
      className="btn"
      style={{ backgroundColor: colors[bg_color], color: text_color, cursor: "pointer", border: "none", outline: "none" }}
    >
      {content}
    </button>
  );
};

export default Button;
