import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import timeout from "../utility/timeout";
import Icon from "../components/Icon";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoggingIn(true);
    const response = await authApi.login(values.email, values.password);

    if (!response.ok) {
      setLoginFailed(true);
      setIsLoggingIn(false);
      timeout(setLoginFailed, 1500, false);
      return;
    }
    setLoginFailed(false);
    setIsLoggingIn(false);

    const token = response.headers["x-auth-token"];
    const { firebaseToken } = response.data;

    login(token, firebaseToken);
  };

  return (
    <ImageBackground
      style={styles.background}
      blurRadius={5}
      source={require("../assets/background.png")}
    >
      <KeyboardAwareScrollView>
        <Screen style={styles.container} type="scroll">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              iconColor={colors.primary}
              size={48}
              backgroundColor="white"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>

          <Image style={styles.logo} source={require("../assets/icon.png")} />
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              onSubmitEditing={handleSubmit}
            />
            <ErrorMessage
              error="Invalid email and/or password"
              visible={loginFailed}
            />
            <SubmitButton title="login" loading={isLoggingIn} />
          </AppForm>
        </Screen>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
export default LoginScreen;
