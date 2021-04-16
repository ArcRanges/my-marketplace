import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import Constants from "expo-constants";

const Screen = ({ children, style, type, refreshControl }) => {
  if (type === "scroll") {
    return (
      <SafeAreaView style={[styles.screen, style]}>
        <ScrollView style={{ ...style }} refreshControl={refreshControl}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={{ ...style, ...styles.view }}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
