import { Platform } from "react-native";

import colors from "./colors.json";

export default {
  colors,
  text: {
    color: colors.darkgray,
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  headerIconSize: 48,
  padding: 10,
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  noProfilePhotoUrl:
    "https://firebasestorage.googleapis.com/v0/b/blist-it-backend.appspot.com/o/assets%2Fuser.png?alt=media&token=81d7023b-ff83-4fde-823e-ce9a8a1ff51d",
};
