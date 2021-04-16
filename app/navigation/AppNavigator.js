import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListingEditScreen from "../screens/ListingEditScreen";
import MyListingsScreen from "../screens/MyListingsScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedNavigator from "./FeedNavigator";
import MyListingsNavigator from "./MyListingsNavigator";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";

import routes from "../navigation/routes";
import MessagesNavigator from "./MessagesNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  // useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyListings"
        component={MyListingsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: ({ color, size }) => (
            <NewListingButton
              onPress={() =>
                navigation.navigate(routes.LISTING_EDIT, {
                  type: "add",
                  listingsData: {},
                })
              }
            />
          ),
        })}
      /> */}
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
