import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";

const Stack = createStackNavigator();

const ListingDetailsStack = (props) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ListingDetailsScreen">
      {() => <ListingDetailsScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="UserProfile" component={UserProfileScreen} />
  </Stack.Navigator>
);
const ListingStack = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsStack} />
  </Stack.Navigator>
);

const CategoriesStack = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="CategoriesScreen"
      options={{
        headerTitle: "Categories",
      }}
    >
      {() => <CategoriesScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="SearchResults"
      component={SearchResultsScreen}
      options={{
        headerTitle: "Search Results",
      }}
    />
    <Stack.Screen name="Listings" component={ListingStack} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsStack} />
  </Stack.Navigator>
);

const SearchResultsStack = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchResults"
      options={{
        headerShown: false,
      }}
    >
      {() => <SearchResultsScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Listings" component={ListingStack} />
  </Stack.Navigator>
);
const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Listings"
      component={ListingStack}
      options={{ headerShown: false }}
    />

    <Stack.Screen name="Categories" component={CategoriesStack} />
    <Stack.Screen
      name="SearchResults"
      component={SearchResultsStack}
      options={{
        headerTitle: "Search Results",
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
