import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";
import defaults from "../config/styles";
import useAuth from "../auth/useAuth";

import useApi from "../hooks/useApi";
import userApi from "../api/users";
import expoApi from "../api/expo";
import firebase from "../firebase/Fire";
import messagesApi from "../api/messages";

import ActivityIndicator from "../components/ActivityIndicator";
import HeaderButton from "../components/HeaderButton";

export default function MessageScreen({ navigation, route }) {
  const getOtherUser = () => {
    // if logged in user is the conversation creator
    // then other user profile at top right should be loaded
    return user._id === item.createdBy._id ? item.createdTo : item.createdBy;
  };

  const { user } = useAuth();
  const item = route.params.item.conversation;
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(getOtherUser());

  const {
    data: userData,
    error: userDataError,
    loading: userLoading,
    request: loadUserData,
  } = useApi(userApi.getUserById);

  // console.log(messages);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: getOtherUser().name,
      headerRight: () => (
        <HeaderButton
          name="information-outline"
          iconColor="black"
          size={defaults.headerIconSize}
          backgroundColor="transparent"
          onPress={() =>
            navigation.navigate("UserProfile", {
              userId: item.createdBy._id,
              userData: otherUser,
            })
          }
        />
      ),
    });
    // endpoint is listingId > senderId > messages
    const db = firebase
      .database()
      .ref(`${item.listing._id}/${item.createdBy._id}`);

    // load messages
    db.on("child_added", (snapshot) => {
      setMessages((prev) => [snapshot.val(), ...prev]);
    });

    // load userData
    loadUserData(otherUser._id);

    return () => db.off();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await messagesApi.sendMessage(
      item.listing,
      messages[messages.length - 1].text,
      item.createdBy._id
    );

    // notify user
    const message = {
      title: otherUser.name,
      body: messages[0].text,
    };

    await expoApi.notifyUser(otherUser._id, message);
    GiftedChat.append(messages);
  }, []);

  const renderBubble = (props) => {
    let chatStyle = {
      borderWidth: 0,
    };

    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
            padding: 5,
          },
        }}
        renderTime={() => (
          <Time
            currentMessage={props.currentMessage}
            timeTextStyle={{
              left: {
                color: "darkgray",
              },
              right: {
                color: "darkgray",
              },
            }}
          />
        )}
        wrapperStyle={{
          left: {
            ...chatStyle,
            padding: 5,
            backgroundColor: "#eaeaea", // lightgray
            color: "black",
          },
          right: {
            ...chatStyle,
            backgroundColor: defaults.colors.primary,
            borderWidth: 0,
          },
        }}
      />
    );
  };
  if (!messages.length) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <GiftedChat
      multiline={false}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={user}
      renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      renderBubble={renderBubble}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
