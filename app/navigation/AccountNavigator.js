import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyListingsNavigator from "../navigation/MyListingsNavigator";
import MessagesNavigator from "../navigation/MessagesNavigator";
import AccountScreen from "../screens/AccountScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="MyListings" component={MyListingsNavigator} />
    <Stack.Screen name="Messages" component={MessagesNavigator} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    <Stack.Screen
      name="ListingDetailsScreen"
      component={ListingDetailsScreen}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
