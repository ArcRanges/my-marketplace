import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";

const MAX_STARS = 5;

const props = {
  size: 24,
  iconColor: colors.primary,
  backgroundColor: colors.white,
  noPadding: true,
};

export default function Ratings({ rating }) {
  const getStars = () => {
    let stars = parseInt(Math.floor(rating.average));
    let half = parseInt(rating.average * 10) % 10 > 5;
    let starsArr = [];
    let key = 0;

    // push full stars
    for (let i = 0; i < stars; i++) {
      starsArr.push(
        <Icon key={key++} name="star" {...props} style={{ marginLeft: -3 }} />
      );
    }
    // push half star if there is
    if (half) {
      starsArr.push(
        <Icon
          key={key++}
          name="star-half"
          {...props}
          backgroundColor={colors.lightgray}
          style={{ marginLeft: -3 }}
        />
      );
    }
    let last = half ? -1 : 0;

    // push last stars
    for (let i = 0; i < MAX_STARS - stars + last; i++) {
      starsArr.push(
        <Icon
          key={key++}
          name={"star"}
          size={24}
          iconColor={colors.lightgray}
          backgroundColor={colors.lightgray}
          noPadding
          style={{ marginLeft: -3 }}
        />
      );
    }

    return starsArr;
  };

  return <View style={styles.container}>{getStars()}</View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 5 },
});
