import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import defaults from "../config/styles";

import AppText from "./AppText";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH - 35;

const Card = ({ title, subTitle, imageUrl, onPress, thumbnailUrl, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={[styles.container, style]}>
        <Image
          resizeMode="cover"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
          style={styles.image}
          tint="light"
        />
        <View style={styles.textContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    ...defaults.shadow,
  },
  container: {
    backgroundColor: colors.white,
    height: 275,
    width: CARD_WIDTH,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    height: 200,
  },
  textContainer: {
    padding: 15,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: "bold",
  },
});
export default Card;
