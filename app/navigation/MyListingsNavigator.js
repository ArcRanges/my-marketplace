import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import MyListingsScreen from "../screens/MyListingsScreen";
import ListingEditScreen from "../screens/ListingEditScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderButton from "../components/HeaderButton";

import defaults from "../config/styles";

const Stack = createStackNavigator();

const MyListingsNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: "Your Listings",
          headerRight: (props) => (
            <HeaderButton
              backgroundColor="transparent"
              name="plus"
              iconColor="black"
              size={defaults.headerIconSize}
              type="right"
              onPress={() =>
                navigation.navigate("ListingEdit", { type: "add" })
              }
            />
          ),
        }}
        name="MyListings"
        component={MyListingsScreen}
      />
      <Stack.Screen name="ListingEdit" component={ListingEditScreen} />
    </Stack.Navigator>
  );
};

export default MyListingsNavigator;
