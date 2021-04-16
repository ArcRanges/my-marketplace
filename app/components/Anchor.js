import React from "react";
import { View, TouchableOpacity } from "react-native";

const Anchor = ({ children, onPress }) => {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

export default Anchor;
