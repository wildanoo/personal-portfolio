import { api } from "@/lib/api";
import { useState } from "react";
import { Category } from "@prisma/client"; // Import the Prisma model type

export type categoryType = Category[] | []

type getAllCategoriesTypeRes = {
  fetchCategories: () => Promise<void>;
  data: categoryType;
  loading: boolean;
  error: unknown;
};

const useGetAllCategories = (): getAllCategoriesTypeRes => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");
  const [data, setData] = useState<categoryType>([]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const getAllCategories = await api.get<categoryType>("/categories"); // Define the API call result type
      setData(getAllCategories || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchCategories, data, loading, error };
};

export default useGetAllCategories;
