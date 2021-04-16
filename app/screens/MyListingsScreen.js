import React, { useEffect } from "react";
import { StyleSheet, FlatList, Alert, View } from "react-native";

import Heading from "../components/Heading";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";

import defaults from "../config/styles";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
// import { user } from '../auth/useAuth';
import myApi from "../api/my";
import listingsApi from "../api/listings";
import { useFocusEffect } from "@react-navigation/core";

export default function MyListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    myApi.getMyListings
  );

  useFocusEffect(
    React.useCallback(() => {
      loadListings();
    }, [])
  );

  useEffect(() => {
    // loadListings();
  }, []);

  const removeItem = async (id) => {
    const response = await listingsApi.removeListing(id);

    if (!response.ok) return Alert.alert("Error removing item");

    loadListings();
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this listing?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => removeItem(id) },
      ],
      { cancelable: false }
    );
  };

  if (error) {
    return (
      <>
        <AppText>Couldn't retrieve listings.</AppText>
        <AppButton title="Retry" onPress={() => loadListings()} />
      </>
    );
  }

  if (!listings.length) {
    return (
      <View style={styles.emptyListingContainer}>
        <AppText style={{ textAlign: "center" }}>
          You haven't listed anything yet. {"\n"}Add one now.
        </AppText>
        <AppButton
          title="Add New Listing"
          onPress={() => navigation.navigate("ListingEdit", { type: "add" })}
        />
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />

      <FlatList
        data={listings}
        refreshing={loading}
        onRefresh={loadListings}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={"$" + item.price}
            image={{ uri: item.images[0] }}
            imageStyle={{ height: 50, width: 50 }}
            onPress={() =>
              navigation.navigate(routes.LISTING_EDIT, {
                listingData: item,
                type: "edit",
              })
            }
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item._id)} />
            )}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: defaults.colors.light,
  },
  emptyListingContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
