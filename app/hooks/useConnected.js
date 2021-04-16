import { useState, useEffect } from "react";

import NetInfo from "@react-native-community/netinfo";

export default useConnected = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable) {
        setConnected(state.isInternetReachable);
      }
    });

    return unsubscribe;
  }, []);

  return connected;
};
