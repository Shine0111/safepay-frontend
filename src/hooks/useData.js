import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useData = (endpoint, requestConfig, deps) => {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get(endpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(
          `Client-Side message: ${err.message} |||| Server-Side message: ${err.response.data.message}`
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint, requestConfig, ...(deps || [])]);

  return { data, error, isLoading };
};

export default useData;
