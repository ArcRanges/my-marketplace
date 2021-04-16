import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";

import usersApi from "../api/users";
import UploadScreen from "./UploadScreen";
import ErrorMessage from "../components/forms/ErrorMessage";
import Icon from "../components/Icon";

import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const RegisterScreen = ({ navigation }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const result = await usersApi.register(values);
    setLoading(false);

    if (!result.ok) {
      console.log(result.data.error);
      setErrorMessage(result.data.error);
      return;
    }
    setIsCompleted(true);

    setTimeout(() => {
      setIsCompleted(false);
      resetForm();
      navigation.goBack();
    }, 1500);
  };

  useEffect(() => {}, [errorMessage]);

  return (
    <ImageBackground
      style={styles.background}
      blurRadius={5}
      source={require("../assets/background.png")}
    >
      <KeyboardAwareScrollView>
        <Screen style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              iconColor={colors.primary}
              size={48}
              backgroundColor="white"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <UploadScreen visible={isCompleted} progress={1} />
          <Image style={styles.logo} source={require("../assets/icon.png")} />
          <AppForm
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
              keyboardType="default"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <ErrorMessage error={errorMessage} visible={errorMessage !== ""} />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              textContentType="password"
              secureTextEntry
            />

            <SubmitButton loading={loading} title="REGISTER" />
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
export default RegisterScreen;
