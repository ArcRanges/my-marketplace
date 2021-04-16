import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import defaults from "../config/styles";

import categories from "../config/categories";

const CategoryItem = ({ item, style, onPress = null }) => {
  const findCategorySource = (id) => {
    return categories.find((cat) => cat.id === id).source;
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.categoryItem, style]}>
      <Image
        resizeMode="contain"
        source={findCategorySource(item._id)}
        style={styles.image}
        tint="light"
      />
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    padding: 10,
    margin: 5,
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    ...defaults.shadow,
  },
  image: {
    width: "100%",
    height: 50,
    marginBottom: 5,
  },
});
export default CategoryItem;
