import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import Screen from "../components/Screen";
import CategoryItem from "../components/CategoryItem";
import CATEGORIES from "../config/categories";
import colors from "../config/colors";

const CategoriesScreen = ({ navigation, route }) => {
  const { categories } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Screen style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() =>
              navigation.navigate("SearchResults", { id: item._id })
            }
            style={{
              width: "32%",
              marginLeft: "auto",
              marginRight: "auto",
              marginVertical: 5,
            }}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.lightgray,
  },
});
export default CategoriesScreen;
