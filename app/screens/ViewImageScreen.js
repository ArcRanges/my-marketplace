import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import colors from "../config/colors";

export default function ViewImageScreen() {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.closeIcon}
        size={35}
        color={"white"}
        name="close"
      ></Icon>
      <Icon
        style={styles.deleteIcon}
        size={35}
        color={"white"}
        name="trash-can-outline"
      ></Icon>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../assets/chair.jpg")}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
