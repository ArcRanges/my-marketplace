import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import defaults from "../config/styles";
import AppText from "./AppText";

export default function Banner({
  backgroundColor = defaults.colors.primary,
  message,
  visible,
}) {
  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <AppText style={styles.bannerText}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: Constants.statusBarHeight,
    padding: 10,
  },
  bannerText: { textAlign: "center", color: defaults.colors.white },
});
