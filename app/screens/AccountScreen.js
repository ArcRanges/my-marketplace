import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  LogBox,
} from "react-native";
import useAuth from "../auth/useAuth";
import BottomSheet from "react-native-bottomsheet-reanimated";
import { Image } from "react-native-expo-image-cache";
import * as ImagePicker from "expo-image-picker";

import firebase from "../firebase/Fire";
import Heading from "../components/Heading";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

import defaults from "../config/styles";
import colors from "../config/colors";
import routes from "../navigation/routes";

import userApi from "../api/users";

import { convertImageToBlob } from "../utility/convertImageToBlob";
import { resizeImage } from "../utility/resizeImage";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
  "componentWillReceiveProps has been renamed",
]);

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.danger,
    },
    targetScreen: routes.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.warning,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: "My Profile",
    icon: {
      name: "account",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.USER_PROFILE,
  },
];

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(
    false
  );

  const {
    data: userData,
    error: userDataError,
    loading: userLoading,
    request: loadUserData,
  } = useApi(userApi.getUserById);

  const {
    data: updatedUserData,
    error: updatedUserDataError,
    loading: updatingUserData,
    request: updateUserData,
  } = useApi(userApi.updateUserById);

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    loadUserData(user._id);
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!granted) alert("You need to enable permission to access the library.");
    setHasMediaLibraryPermission(granted);
  };

  const onLogoutPressed = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => logout() },
    ]);
  };

  const renderHeaderComponent = () => {
    return (
      <>
        <Heading type="h3" style={{ color: defaults.colors.gray }}>
          Account Settings
        </Heading>
      </>
    );
  };

  const onProfileImagePressed = () => {
    bottomSheetRef.current.snapTo(1);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) {
        // let resized = await resizeImage(result.uri);
        // uploadImage(resized.uri);
        // console.log(result.uri);
        return result.uri;
      }
    } catch (error) {
      logger.log("Error reading an image", error);
    }
  };

  const onPhotoUploadPressed = async (type) => {
    const uri = await selectImage();
    const resized = await resizeImage(uri);
    const blob = await convertImageToBlob(resized.uri);

    let fna = uri.split("/"); // file name array
    let filename = fna[fna.length - 1];
    const ref = firebase.storage().ref(`/uploads/${user._id}/${filename}`);
    const task = ref.put(blob);

    task.on(
      "state_changed",
      (taskSnapshot) => {
        // let current = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes) / images.length;
        // setCurrentProgress(currentProgress => current + currentProgress)
        let progress = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes;
        // setCurrentProgress(progress * 100);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("Unauthorized upload");
            break;
          case "storage/canceled":
            console.log("User cancelled upload");
            break;
          case "storage/unknown":
            console.log("An unknown error occurred");
            break;
        }
      },
      async () => {
        blob.close();
        let url = await ref.getDownloadURL();
        const update = {};
        type === "profile"
          ? (update.profilePhoto = url)
          : (update.coverPhoto = url);

        updateUserData(user._id, update);

        setTimeout(() => {
          loadUserData(user._id);
        }, 1000);

        return url;
      }
    );
  };

  return (
    <Screen
      style={styles.wrapper}
      // type="scroll"
      // refreshControl={
      //   <RefreshControl
      //     refreshing={isPhotoUploading}
      //     onRefresh={() => loadUserData(user._id)}
      //   />
      // }
    >
      <View style={styles.header}>
        <Heading type="h1">Hello, {user.name}</Heading>
        <TouchableOpacity onPress={onProfileImagePressed}>
          <Image
            uri={userData.profilePhoto || defaults.noProfilePhoto}
            preview={{
              uri: defaults.noProfilePhoto,
            }}
            tint="light"
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeaderComponent}
          scrollEnabled={false}
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() =>
                navigation.navigate(item.targetScreen, {
                  userId: user._id,
                  userData: user,
                })
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        initialPosition={0} //200, 300
        snapPoints={["0%", "50%"]}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        backDropColor="black"
        // isModal
        containerStyle={styles.bottomSheetStyle}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{ backgroundColor: "red" }}
        bodyStyle={styles.bottomSheetBodyStyle}
        body={
          <>
            {!hasMediaLibraryPermission && (
              <AppText style={{ color: "red", textAlign: "center" }}>
                Please enable the permissions for Media Library in your Privacy
                Settings.
              </AppText>
            )}
            <AppButton
              color="primary"
              title={"Upload Profile Photo"}
              loading={!hasMediaLibraryPermission || updatingUserData}
              onPress={() => onPhotoUploadPressed("profile")}
            />
            <AppButton
              color="info"
              title="Upload Cover Photo"
              loading={!hasMediaLibraryPermission || updatingUserData}
              onPress={() => onPhotoUploadPressed("cover")}
            />
            <AppButton
              color="danger"
              title="Logout"
              onPress={onLogoutPressed}
            />
          </>
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: "white",
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomSheetBodyStyle: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    padding: defaults.padding,
    backgroundColor: defaults.colors.white,
  },
  container: {
    paddingVertical: 20,
  },
});
export default AccountScreen;
