import { useState } from "react";
import { fetchData } from "../services/api";

interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export const useFormSubmit = <T,>(endpoint: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (formData: Record<string, any>): Promise<T | void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response: ApiResponse<T> = await fetchData(endpoint, "POST", formData);
      if (response.status === 200) {
        setSuccess(true);
        return response.data; // Return the API response
      } else {
        throw new Error(response.message || "An error occurred");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, success };
};
