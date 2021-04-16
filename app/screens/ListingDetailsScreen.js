import React, { useState, useEffect } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Constants from "expo-constants";
import colors from "../config/colors";

import MapView, { Marker, Callout } from "react-native-maps";
import openMap, { createOpenLink } from "react-native-open-maps";

import ListItem from "../components/lists/ListItem";
import AppText from "../components/AppText";
import KeyboardAwareView from "../components/KeyboardAvoidingView";
import ContactSellerForm from "../components/ContactSellerForm";
import HeaderButton from "../components/HeaderButton";

import routes from "../navigation/routes";

import userApi from "../api/users";
import messagesApi from "../api/messages";
import expoApi from "../api/expo";
import useAuth from "../auth/useAuth";
import defaults from "../config/styles";

const defaultDelta = { latitudeDelta: 0.03, longitudeDelta: 0.03 };
const ListingDetailsScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const [listing, setListing] = useState(route.params);
  const {
    data: userData,
    error: userDataError,
    loading: userLoading,
    request: loadUserData,
  } = useApi(userApi.getUserById);

  const updateItemDetails = (params) => {
    setListing(params);
  };

  useEffect(() => {
    loadUserData(listing.postedBy);
  }, [listing]);

  const openMapWithConfig = () => {
    const goToMap = createOpenLink({ ...listing.location, query: "Vancouver" });
    goToMap();
  };

  const goToMap = () => {
    Alert.alert(
      "Opening Maps",
      "This will open your default maps application.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => openMapWithConfig(),
        },
      ]
    );
  };

  const onSendMessage = async (listing, message) => {
    const result1 = await messagesApi.sendMessage(listing, message, user._id);
    const result2 = await expoApi.notifyUser(listing.postedBy, message);
    if (!result1.ok || !result2.ok) {
      console.log(result1.originalError);
      console.log(result2.originalError);
    }
  };

  return (
    <KeyboardAwareView>
      <View style={styles.imageContainer}>
        <HeaderButton
          onPress={() => navigation.goBack()}
          type="left"
          name="close"
          size={36}
          iconColor={colors.primary}
          backgroundColor={colors.light}
          style={styles.headerButtonLeft}
        />
        <Image
          uri={listing.images[0]}
          preview={{ uri: listing.images[0] }}
          tint="light"
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.subTitle}>$ {listing.price}</AppText>
        <AppText>
          {listing.description ||
            "No description provided.\nContact the seller for inquiries."}
        </AppText>

        <View style={styles.userContainer}>
          {userData && (
            <ListItem
              onPress={() =>
                navigation.navigate(routes.USER_PROFILE, {
                  userId: listing.postedBy,
                  userData,
                  updateItemDetails,
                })
              }
              title={userData.name}
              image={{
                uri: userData.profilePhoto || defaults.noProfilePhotoUrl,
              }}
              showChevrons
            />
          )}
        </View>

        {user._id !== listing.postedBy && (
          <ContactSellerForm listing={listing} onSendMessage={onSendMessage} />
        )}

        {listing.location && (
          <MapView
            style={styles.map}
            initialRegion={{ ...listing.location, ...defaultDelta }}
          >
            <Marker
              coordinate={{
                ...listing.location,
              }}
            >
              <Callout onPress={goToMap}>
                <AppText>Open in Maps</AppText>
              </Callout>
            </Marker>
          </MapView>
        )}
      </View>
    </KeyboardAwareView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
  headerButtonLeft: {
    position: "absolute",
    left: 20,
    top: Constants.statusBarHeight,
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
  title: {
    fontSize: 24,
    fontFamily: "Avenir",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userContainer: {
    marginVertical: 10,
  },
  map: {
    marginVertical: 15,
    width: "100%",
    height: 400,
  },
});
export default ListingDetailsScreen;
