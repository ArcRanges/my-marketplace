import React, { useRef } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import ImageInput from "./ImageInput";

const ImageInputList = ({
  imageUris = [],
  onAddImage,
  onRemoveImage,
  onImageUpload,
}) => {
  const scrollView = useRef();
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        style={styles.container}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((img, i) => (
            <View key={i} style={styles.image}>
              <ImageInput
                imageUri={img?.url || img}
                onChangeImage={() => onRemoveImage(img)}
              />
            </View>
          ))}
          <ImageInput
            onChangeImage={(uri) => onAddImage(uri)}
            onImageUpload={onImageUpload}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 5,
  },
});
export default ImageInputList;
