import React, { useState, useEffect, useRef } from "react";
import { Alert, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logger from "../utility/logger";
import firebase from "../firebase/Fire";
import useAuth from "../auth/useAuth";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";

import timeout from "../utility/timeout";
import { convertImageToBlob } from "../utility/convertImageToBlob";
import { resizeImage } from "../utility/resizeImage";

const ImageInput = ({ imageUri, onChangeImage, onImageUpload }) => {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const uploadImage = async (uri) => {
    onImageUpload(true);
    setIsUploading(true);
    let fileNameArray = uri.split("/");
    let filename = fileNameArray[fileNameArray.length - 1];
    // convert to blob
    const blob = await convertImageToBlob(uri);

    const ref = firebase.storage().ref(`/uploads/${user._id}/${filename}`);
    const task = ref.put(blob);

    task.on(
      "state_changed",
      (taskSnapshot) => {
        // let current = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes) / images.length;
        // setCurrentProgress(currentProgress => current + currentProgress)
        let progress = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes;
        setCurrentProgress(progress * 100);
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

        timeout(() => {
          setIsUploading(false);
          onImageUpload(false);
          setCurrentProgress(0);
          onChangeImage(url);
        }, 1000);
        return url;
      }
    );
  };

  // const resizeImage = async (path) => {
  //   const width = 1024;
  //   return await ImageManipulator.manipulateAsync(
  //     path,
  //     [{ resize: { width } }],
  //     {
  //       compress: 0.3,
  //       format: ImageManipulator.SaveFormat.JPEG,
  //     }
  //   );
  // };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.cancelled) {
        let resized = await resizeImage(result.uri);
        uploadImage(resized.uri);
      }
    } catch (error) {
      logger.log("Error reading an image", error);
    }
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.pickerContainer}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      {isUploading && !imageUri && (
        <View style={styles.progressContainer}>
          <Progress.Bar
            useNativeDriver={true}
            color={colors.primary}
            progress={currentProgress / 100}
            style={{ width: "90%", height: 3 }}
            unfilledColor={colors.lightgray}
            borderColor={colors.lightgray}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  pickerContainer: {
    height: 75,
    width: 75,
    backgroundColor: colors.lightgray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 5,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ImageInput;
