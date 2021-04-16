import { useState, useEffect } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const setErrorData = (e, d) => {
    setError(() => e);
    setData(() => d);
  };

  const request = async (...args) => {
    setLoading(true);

    // setTimeout(async () => {
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      return setErrorData(true, response.data.error);
    }

    setError(false);
    setData(response.data);
    // }, 1000);
  };

  useEffect(() => {}, [data, error, loading]);

  return { data, error, loading, request };
};
