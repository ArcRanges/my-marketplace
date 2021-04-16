import React from "react";
import { View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Icon = ({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  noPadding = false,
  style,
}) => {
  if (noPadding) {
    return (
      <MaterialCommunityIcons
        name={name}
        color={iconColor}
        size={size}
        style={style}
      />
    );
  }
  return (
    <View
      style={[
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
    </View>
  );
};

export default Icon;
