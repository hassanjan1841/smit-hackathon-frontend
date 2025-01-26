import { useState, useCallback } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async ({ url, method = "GET", body = null, headers = {} }) => {
      setLoading(true);
      setError(null);

      try {
        const config = {
          method,
          url,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          data: body, // Axios uses `data` for POST/PUT requests
        };

        const response = await axios(config);

        return response.data; // Axios directly returns the data
      } catch (err) {
        // Handle errors
        const errorMessage = err.response
          ? err.response.data.message || err.response.data
          : err.message;

        setError(errorMessage);

        throw err; // Re-throw for handling elsewhere if needed
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchData, loading, error };
};

export default useFetch;
