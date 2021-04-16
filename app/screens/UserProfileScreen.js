import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
  LogBox,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import Constants from "expo-constants";

import defaults from "../config/styles";
import colors from "../config/colors";

import HeaderButton from "../components/HeaderButton";
import Heading from "../components/Heading";
import { ListItem } from "../components/lists";
import Card from "../components/Card";
import AppText from "../components/AppText";
import RateModal from "../components/RateModal";

import useApi from "../hooks/useApi";
import searchApi from "../api/search";
import ratingsApi from "../api/ratings";
import useAuth from "../auth/useAuth";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);

export default function UserProfileScreen({ navigation, route }) {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { userId, userData } = route.params;

  const {
    data: recentListings,
    error: listingDataError,
    loading: listingLoading,
    request: loadRecentListings,
  } = useApi(searchApi.getListingsByUserId);

  const {
    data: ratingsData,
    error: ratingsDataError,
    loading: ratingsLoading,
    request: loadUserRatings,
  } = useApi(ratingsApi.getRatingsByUserId);

  const {
    data: ratingResult,
    error: addRatingError,
    loading: isUserBeingRated,
    request: rateUser,
  } = useApi(ratingsApi.rateUserById);

  const loadData = () => {
    loadRecentListings(userId);
    loadUserRatings(userId);
  };

  useLayoutEffect(() => {
    loadData();
  }, [userId]);

  useEffect(() => {
    loadData();
  }, []);

  const onSubmitRating = (rating) => {
    rateUser(userId, rating);
  };

  const renderRecentListings = () => {
    if (listingLoading) return <AppText>Loading ...</AppText>;

    if (recentListings && recentListings.length == 0) return null;

    return recentListings.map((item, i) => (
      <Card
        key={i}
        title={item.title}
        subTitle={"$" + item.price}
        imageUrl={item.images[0]}
        thumbnailUrl={item.images[0].url}
        onPress={() => onGoBack(item)}
      />
    ));
  };

  const renderRatingsData = () => {
    if (ratingsLoading) return <AppText>Loading ...</AppText>;

    if (!ratingsData) return null;

    return (
      <ListItem
        openRatingModal={setModalVisible}
        showRateButton={user._id !== userId}
        title="User Reviews"
        subTitle={
          ratingsData.count > 0
            ? `Based on ${ratingsData.count} review${
                ratingsData.count > 1 ? "s" : ""
              }`
            : "User is unrated"
        }
        type="ratings"
        rating={{
          average: ratingsData.average,
          total: ratingsData.totalStars,
        }}
        containerStyle={{
          paddingLeft: 0,
        }}
        textContainerStyle={{
          marginLeft: 0,
        }}
      />
    );
  };

  const onGoBack = (item) => {
    if (route.params.updateItemDetails) {
      route.params.updateItemDetails(item);
    }
    navigation.navigate("ListingDetailsScreen", item);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={listingLoading || ratingsLoading}
          onRefresh={loadData}
        />
      }
    >
      {ratingsData && (
        <RateModal
          visible={modalVisible}
          loading={listingLoading || ratingsLoading || isUserBeingRated}
          setModalVisible={setModalVisible}
          onSubmit={onSubmitRating}
        />
      )}
      <View style={styles.imageContainer}>
        <HeaderButton
          onPress={() => navigation.goBack()}
          type="left"
          name="chevron-left"
          size={36}
          iconColor={defaults.colors.primary}
          backgroundColor={defaults.colors.light}
          style={styles.headerButtonLeft}
        />
        {/* <HeaderButton
          iconColor={colors.primary}
          size={36}
          onPress={() => console.log("reporting profile")}
          name="dots-horizontal"
          backgroundColor={colors.white}
          style={styles.headerButtonRight}
        /> */}
        <Image
          uri={"https://placeimg.com/640/480/any"}
          preview={{ uri: "https://placeimg.com/640/480/any" }}
          tint="light"
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              uri={userData.profilePhoto || defaults.noProfilePhotoUrl}
              preview={{ uri: "https://placeimg.com/640/480/any" }}
              tint="light"
              style={styles.profileImage}
            />
          </View>
          <Heading type="h3">{userData.name}</Heading>
          <Heading
            type="h4"
            style={{ color: colors.gray, fontWeight: "normal" }}
          >
            {/* Vancouver, BC */}
          </Heading>
        </View>
        {renderRatingsData()}

        <Heading type="h4" style={{ marginBottom: 10 }}>
          More From This Seller
        </Heading>
        {renderRecentListings()}
      </View>
    </ScrollView>
  );
}
const headerButton = {
  position: "absolute",
  top: Constants.statusBarHeight,
  marginTop: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerButtonLeft: {
    ...headerButton,
    left: 20,
  },
  headerButtonRight: {
    ...headerButton,
    right: 20,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    zIndex: -1,
    height: 300,
    width: "100%",
  },
  contentContainer: {
    padding: defaults.padding + 10,
    marginTop: -25,
    zIndex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    height: 125,
    width: 125,
    borderRadius: 65,
    overflow: "hidden",
    marginTop: -75,
    marginBottom: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    height: 125,
    width: 125,
    resizeMode: "contain",
  },
});
