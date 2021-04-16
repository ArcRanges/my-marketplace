import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import Banner from "./app/components/Banner";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import { navigationRef } from "./app/navigation/rootNavigation";
import useConnected from "./app/hooks/useConnected";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["ReactNative.NativeModules.LottieAnimationView"]);

export default function App() {
  const connected = useConnected();
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) return;
    setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={() => console.log("Error loading app")}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Banner visible={!connected} message="No Internet Connection" />
      <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
