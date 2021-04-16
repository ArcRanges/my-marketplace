import React from "react";
import { View, StyleSheet, SectionList, FlatList } from "react-native";
import Anchor from "../components/Anchor";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Screen from "../components/Screen";
import constants from "../config/constants";
import defaults from "../config/styles";

const example = [
  {
    id: 1,
    title: "Arts",
    data: [
      [
        { id: 1, title: "Test 1" },
        { id: 2, title: "Test 2" },
        { id: 3, title: "Test 3" },
        { id: 4, title: "Test 4" },
      ],
    ],
  },
  {
    id: 2,
    title: "Books",
    data: [
      [
        { id: 1, title: "Test 1" },
        { id: 2, title: "Test 2" },
        { id: 3, title: "Test 3" },
        { id: 4, title: "Test 4" },
      ],
    ],
  },
  {
    id: 3,
    title: "Cars",
    data: [
      [
        { id: 1, title: "Test 1" },
        { id: 2, title: "Test 2" },
        { id: 3, title: "Test 3" },
        { id: 4, title: "Test 4" },
      ],
    ],
  },
  {
    id: 4,
    title: "Technology",
    data: [
      [
        { id: 1, title: "Test 1" },
        { id: 2, title: "Test 2" },
        { id: 3, title: "Test 3" },
        { id: 4, title: "Test 4" },
      ],
    ],
  },
];
const AllListingsScreen = ({ navigation, route }) => {
  const renderSectionHeader = (title) => {
    return (
      <View style={styles.sectionHeader}>
        <Heading type="h2">{title}</Heading>
        <Anchor>
          <AppText style={{ color: defaults.colors.secondary }}>
            View All
          </AppText>
        </Anchor>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <Card
        style={styles.cardStyle}
        title={item.title}
        subTitle="$200"
        imageUrl={"https://placeimg.com/640/480/any"}
      />
    );
  };

  return (
    <Screen style={styles.container}>
      <SectionList
        sections={example}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <FlatList
            snapToInterval={1}
            decelerationRate={0}
            snapToInterval={constants.screenWidth * 0.75 + 20}
            snapToAlignment={"start"}
            data={item}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
        renderSectionHeader={({ section: { title } }) =>
          renderSectionHeader(title)
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: defaults.padding,
  },
  cardStyle: {
    marginRight: 10,
    marginLeft: 10,
    width: constants.screenWidth * 0.75,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default AllListingsScreen;
