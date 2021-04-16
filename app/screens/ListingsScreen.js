import React, { useState, useEffect } from "react";
import { RefreshControl, StyleSheet, View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import useAuth from "../auth/useAuth";

import AppButton from "../components/AppButton";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import categoriesApi from "../api/categories";

import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import Heading from "../components/Heading";
import Anchor from "../components/Anchor";
import CategoryItem from "../components/CategoryItem";

import SearchBar from "react-native-dynamic-search-bar";
import timeout from "../utility/timeout";

import useNotifications from "../hooks/useNotifications";
import constants from "../config/constants";

const ListingsScreen = ({ navigation }) => {
  useNotifications();

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );

  const {
    data: categories,
    error: catError,
    loading: catLoading,
    request: loadCategories,
  } = useApi(categoriesApi.getCategories);

  useEffect(() => {
    loadListings();
    loadCategories();
  }, []);

  const resetData = () => {
    setSearchText("");
    setIsSearching(false);
    loadListings();
  };

  const clearSearchResults = () => {
    resetData();
  };

  const handleOnChangeText = (text) => {
    if (text.length > constants.minimumSearchTextLength) {
      setIsSearching(true);
      setSearchText(text);
      loadListings(text, currentPage);
      timeout(() => setIsSearching(false), 1000);
      return;
    }

    if (text === "") {
      resetData();
      return;
    }
  };

  const renderCategories = () => {
    return (
      <>
        <View style={styles.headingContainer}>
          <Heading type="h2">Main Categories</Heading>
          <Anchor
            onPress={() => navigation.navigate("Categories", { categories })}
          >
            <AppText style={{ color: colors.primary }}>View All</AppText>
          </Anchor>
        </View>

        <FlatList
          style={{ marginBottom: 10 }}
          horizontal
          data={categories}
          keyExtractor={(item) => item._id.toString()}
          snapToInterval={1}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={135}
          snapToAlignment={"start"}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              onPress={() =>
                navigation.navigate("SearchResults", {
                  id: item._id,
                  title: item.value,
                })
              }
            />
          )}
        />

        <View style={styles.headingContainer}>
          <Heading type="h2">Recent Listings</Heading>
          {/* <Anchor onPress={() => console.log("Anchor pressed")}>
            <AppText style={{ color: colors.primary }}>View All</AppText>
          </Anchor> */}
        </View>
      </>
    );
  };

  return (
    <Screen style={styles.container}>
      <SearchBar
        style={styles.searchBarStyle}
        placeholder="Search for a anything here..."
        onClearPress={clearSearchResults}
        onChangeText={handleOnChangeText}
        spinnerVisibility={isSearching}
        clearIconImageStyle={{ opacity: searchText === "" ? 0 : 1 }}
      />
      {error && (
        <>
          <AppText>Couldn't retrieve listings.</AppText>
          <AppButton title="Retry" onPress={() => loadListings()} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        ListHeaderComponent={searchText == "" ? renderCategories : null}
        showsVerticalScrollIndicator={false}
        data={listings}
        refreshing={loading}
        refreshControl={
          <RefreshControl
            refreshing={loading || isSearching}
            onRefresh={loadListings}
          />
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
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: "white",
    width: 125,
    padding: 15,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  searchBarStyle: {
    width: "100%",
    marginBottom: 10,
  },
});
export default ListingsScreen;
