import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";

import colors from "../config/colors";
import useApi from "../hooks/useApi";
import searchApi from "../api/search";
import routes from "../navigation/routes";

const SearchResultsScreen = ({ navigation, route }) => {
  // const [loading, setLoading] = useState(false);
  const { params } = route;

  const { data: listings, error, loading, request: loadListings } = useApi(
    searchApi.getListingsByCategoryId
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: params.title ? `${params.title}` : "Search Results",
    });
    loadListings(params.id);
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator visible={loading} />
      </View>
    );

  if (!listings.length)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <AppText>There aren't listings for this category.</AppText>

        <AppButton
          title="Add New Listing"
          onPress={() => navigation.navigate("MyListings")}
        />
        <AppButton
          color="warning"
          title="Retry"
          onPress={() => loadListings(params.id)}
        />
      </View>
    );

  return (
    <Screen style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listings}
        refreshing={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadListings} />
        }
        onRefresh={loadListings}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$ " + item.price}
            imageUrl={item.images[0]}
            thumbnailUrl={item.images[0].thumbnailUrl}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 15,
  },
});
export default SearchResultsScreen;
