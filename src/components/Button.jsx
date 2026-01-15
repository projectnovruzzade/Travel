import React from "react";

const Button = ({ content, bg_color, text_color }) => {
  const colors = {
    yellowMain: "#D79A4D",
    yellowText: "#AC7B3E",
    secondaryText: "#505050",

    blueDark: "#0A1030",
    blueButton: "#1D3557",
    blueOriginal: "#155DFC",
    blueSecondary: "#DBEAFE",
    blueText: "#1447E6",

    greenOriginal: "#00A63E",
  };

  return (
    <div
      className="btn"
      style={{ backgroundColor: colors[bg_color], color: text_color }}
    >
      {content}
    </div>
  );
};

export default Button;
