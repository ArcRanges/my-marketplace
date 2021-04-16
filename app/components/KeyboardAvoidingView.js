import React from "react";
import { Platform } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function KeyboardAwareView({ children }) {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>;
  }
  return <>{children}</>;
}
