import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Heading from "./Heading";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

import Modal from "react-native-modal";
import AppTextInput from "./AppTextInput";

import { AirbnbRating } from "react-native-ratings";
import colors from "../config/colors";
import AppButton from "./AppButton";
import timeout from "../utility/timeout";
import { ErrorMessage } from "./forms";

const RateModal = ({ onSubmit, visible, loading, setModalVisible }) => {
  const [stars, setStars] = useState(0);
  const [title, setTitle] = useState("");

  const resetRatingData = () => {
    setStars(0);
    setTitle("");
  };

  const onSubmitRating = () => {
    if (title == "" || stars == 0) return;

    const rating = {
      title,
      stars,
    };

    onSubmit(rating);

    timeout(() => {
      resetRatingData();
      setModalVisible(false);
    }, 1000);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setModalVisible(false)}
      animationType="slide"
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      style={{ justifyContent: "center", zIndex: 99 }}
    >
      <View style={styles.modalInner}>
        <Heading type="h3">Rate this Seller</Heading>
        <View>
          <AppTextInput
            onChangeText={setTitle}
            placeholder="What did you like about this seller?"
            disabled={loading}
          />
          <ErrorMessage
            visible={title === ""}
            error="Title must not be empty."
          />
          <AirbnbRating
            isDisabled={loading}
            showRating={false}
            defaultRating={stars}
            onFinishRating={setStars}
            selectedColor={colors.primary}
            reviewColor={colors.primary}
            starContainerStyle={{ marginVertical: 20 }}
          />
          <ErrorMessage visible={stars == 0} error="Rating is required." />
        </View>

        <AppButton
          title="Submit Rating"
          onPress={onSubmitRating}
          loading={loading || title == "" || stars == 0}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    width: "90%",
  },
  modalInner: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-between",
  },
});
export default RateModal;
