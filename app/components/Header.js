import React from "react";
import { View } from "react-native";
import AppText from "../components/AppText";
import HeaderButton from "../components/HeaderButton";

const Header = () => {
  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <HeaderButton
          type="left"
          name="chevron-left"
          iconColor="black"
          size={48}
          backgroundColor="transparent"
        />
      </View>
      <AppText>HeaderTitle</AppText>
      <HeaderButton
        name="magnify"
        iconColor="black"
        size={48}
        backgroundColor="transparent"
      />
    </View>
  );
};

export default Header;
