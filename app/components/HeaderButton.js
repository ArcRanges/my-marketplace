import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "./Icon";

export default function HeaderButton({
  backgroundColor,
  onPress,
  type,
  name,
  iconColor,
  size = 28,
  style,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <Icon
        name={name}
        iconColor={iconColor}
        size={size}
        style={[type == "left" ? { marginLeft: 10 } : { marginRight: 10 }]}
        backgroundColor={backgroundColor}
      />
    </TouchableOpacity>
  );
}
