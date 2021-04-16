import React, { useState, useEffect } from "react";
import _ from "lodash";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";

import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import categoriesApi from "../api/categories";
import UploadScreen from "./UploadScreen";
import difference from "../utility/diff";
import timeout from "../utility/timeout";

const defaultValues = {
  title: "",
  price: "",
  category: null,
  description: "",
  images: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(1000000).label("Price"),
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().required().max(255).label("Description"),
  images: Yup.array()
    .min(1, "Please select at least one image.")
    .required()
    .label("Images"),
});

const ListingEditScreen = ({ navigation, route }) => {
  const { listingData, type } = route.params || ({}, "");
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [hasImageUploading, setHasImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: categories, error, loading, request: loadCategories } = useApi(
    categoriesApi.getCategories
  );

  useEffect(() => {
    loadCategories();
    navigation.setOptions({
      title: type === "add" ? "New Listing" : "Edit Listing",
    });
  }, []);

  const onSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    let result;
    if (type === "edit") {
      let newData = difference(listing, listingData);

      if (newData.images) newData.images = listing.images;

      result = await listingsApi.editListing(
        listingData._id,
        { ...newData, location },
        (progress) => setProgress(progress)
      );

      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the listing");
      }
      return timeout(navigation.goBack, 1200);
    }

    result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
    timeout(() => {
      setUploadVisible(false);
      return navigation.goBack();
    }, 1200);
  };

  return (
    <Screen style={styles.container} type="scroll">
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={type == "edit" ? listingData : defaultValues}
        onSubmit={onSubmit}
        handleChange={() => console.log("something changed")}
        validationSchema={validationSchema}
      >
        <FormImagePicker
          name="images"
          type={type}
          value={type == "edit" ? listingData.images : []}
          imageUploading={setHasImageUploading}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={255}
          name="title"
          placeholder="Title"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={8}
          name="price"
          placeholder="Price"
          maxWidth={120}
        />
        <Picker
          items={categories}
          selectedItem={type === "edit" ? listingData.category : null}
          type={type}
          name="category"
          placeholder="Category"
          maxWidth="50%"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
        />
        <FormField
          autoCapitalize="none"
          maxLength={255}
          autoCorrect={false}
          name="description"
          multiline
          numberOfLines={3}
          placeholder="Description"
        />

        <SubmitButton
          loading={loading || hasImageUploading}
          title={type == "edit" ? " submit changes" : "post"}
        />
      </Form>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
