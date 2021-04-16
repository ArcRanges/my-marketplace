import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import * as Notifications from "expo-notifications";
import * as Yup from "yup";

// import messagesApi from "../api/messages";

import { AppForm, AppFormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  text: Yup.string().required().min(1).max(256).label("Message"),
});

export default function ContactSellerForm({ listing, onSendMessage }) {
  const sendMessage = async ({ text }, { resetForm }) => {
    onSendMessage(listing, text);
    // const response = await messagesApi.send(data);
    // if (!response.ok) {
    //   return Alert.alert("Error", "Could not send a message. Try again later");
    // }

    resetForm();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Success",
        body: "Your message has been sent!",
      },
      trigger: null,
    });
  };
  return (
    <View style={styles.messageContainer}>
      <AppForm
        initialValues={{ text: "" }}
        onSubmit={sendMessage}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          name="text"
          placeholder="Message..."
          keyboardType="default"
        />
        <SubmitButton title="CONTACT SELLER" />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 15,
  },
});
