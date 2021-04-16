import React from "react";
import AppText from "./AppText";

export default function Heading({ children, type, style }) {
  const getFontSize = (size) => {
    switch (size) {
      case "h1":
        return 32;
      case "h2":
        return 24;
      case "h3":
        return 18.72;
      case "h4":
        return 16;
      case "h5":
        return 12;
      default:
        return 10;
    }
  };
  return (
    <AppText
      style={[{ fontSize: getFontSize(type), fontWeight: "bold" }, style]}
    >
      {children}
    </AppText>
  );
}
