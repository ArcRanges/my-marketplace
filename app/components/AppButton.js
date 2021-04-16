import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../config/colors";

const AppButton = ({
  children,
  color = "primary",
  loading,
  onPress,
  title,
  style,
  outline = false,
  buttonTextStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          ...styles.button,
          backgroundColor: colors[color],
          opacity: loading ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={[styles.buttonText, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default AppButton;
