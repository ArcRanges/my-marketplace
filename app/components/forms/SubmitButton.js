import React from "react";
import { View, Text } from "react-native";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

const SubmitButton = ({ loading, title }) => {
  const { handleSubmit } = useFormikContext();

  return <AppButton loading={loading} title={title} onPress={handleSubmit} />;
};

export default SubmitButton;
