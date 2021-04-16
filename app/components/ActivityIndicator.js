import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={{ zIndex: 2 }}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
      />
    </View>
  );
};

export default ActivityIndicator;
