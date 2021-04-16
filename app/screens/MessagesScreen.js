import React, { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import Heading from "../components/Heading";

import { useFocusEffect } from "@react-navigation/core";

import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import myApi from "../api/my";
import convApi from "../api/conversations";
import AppButton from "../components/AppButton";
import useAuth from "../auth/useAuth";

const MessagesScreen = ({ navigation }) => {
  const { user } = useAuth();

  const { data, error, loading, request: loadConversations } = useApi(
    myApi.getMyConversations
  );

  const [refreshing, setRefreshing] = useState(false);

  const deleteMessage = async (id) => {
    const result = await convApi.removeConversation(id);
    if (result.success) loadConversations();
  };

  const handleDelete = async (item) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => await deleteMessage(item.conversation._id),
        },
      ]
    );
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const isUserSender = (senderId) => {
    return user._id === senderId;
  };

  // if (loading) return <ActivityIndicator visible={true} />;

  if (!data.conversations?.length) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Heading type="h3">You currently do not have messages.</Heading>
        <AppButton title="Reload Messages" onPress={loadConversations} />
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <FlatList
        data={data.conversations}
        keyExtractor={(msg) => msg._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={
              item.conversation.messages[item.conversation.messages.length - 1]
                .text
            }
            subTitle={
              isUserSender(item.conversation.createdBy._id)
                ? "You started this conversation"
                : `Started by ${item.conversation.createdBy.name}`
            }
            image={{
              uri: item.conversation.listing.images[0],
            }}
            imageStyle={{ height: 50, width: 50 }}
            onPress={() => navigation.navigate("Message", { item })}
            showChevrons
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        refreshing={refreshing}
        onRefresh={loadConversations}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MessagesScreen;
