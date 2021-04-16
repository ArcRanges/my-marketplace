import * as ImageManipulator from "expo-image-manipulator";

export const resizeImage = async (path) => {
  const width = 1024;
  return await ImageManipulator.manipulateAsync(path, [{ resize: { width } }], {
    compress: 0.3,
    format: ImageManipulator.SaveFormat.JPEG,
  });
};
