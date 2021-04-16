import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import MessageScreen from "../screens/MessageScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

const MessagesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Message" component={MessageScreen} />
    <Stack.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ListingDetailsScreen"
      component={ListingDetailsScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default MessagesNavigator;
