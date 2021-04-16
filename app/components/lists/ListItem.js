import React from "react";
import { View, TouchableHighlight, StyleSheet, Image } from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Button from "../AppButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Ratings from "../Ratings";
import Heading from "../Heading";

const ListItem = ({
  title,
  subTitle,
  image,
  imageStyle,
  onPress,
  showChevrons,
  IconComponent,
  renderRightActions,
  type,
  rating,
  openRatingModal,
  containerStyle,
  textContainerStyle,
  showRateButton,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.lightgray}>
        <View style={[styles.container, containerStyle]}>
          {IconComponent}
          {image && <Image style={[styles.image, imageStyle]} source={image} />}
          <View style={[styles.textContainer, textContainerStyle]}>
            {title && <Heading type="h4">{title}</Heading>}
            {type === "ratings" && <Ratings rating={rating} />}
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          {showRateButton && type === "ratings" && (
            <Button
              onPress={() => openRatingModal(true)}
              color="primary"
              style={styles.rateSellerButton}
              title="Rate Seller"
              buttonTextStyle={styles.rateSellerText}
            />
          )}
          {showChevrons && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={colors.medium}
              backgroundColor="transparent"
            />
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexDirection: "row",
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 35,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 14,
    color: colors.gray,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",

    flex: 1,
  },
  rateSellerButton: {
    width: "auto",
    height: "auto",
    padding: 10,
    borderRadius: 5,
  },
  rateSellerText: {
    color: colors.white,
    textTransform: "capitalize",
  },
});

export default ListItem;
