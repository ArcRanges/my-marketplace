import React from "react";

import { useFormikContext } from "formik";
import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

const FormImagePicker = ({ name, type, imageUploading, ...otherProps }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  let imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        onImageUpload={imageUploading}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};
export default FormImagePicker;
