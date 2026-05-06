import { getSellerProducts, createProduct } from "../services/product.api";
import {
  setError,
  setSellerProducts,
  setLoading,
} from "../state/product.slice";
import { useDispatch } from "react-redux";

export function useProduct() {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      dispatch(setLoading(true));
      const data = await createProduct(formData);
      await handleGetSellerProduct();
      return data.product;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to create product"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetSellerProduct() {
    try {
      dispatch(setLoading(true));
      const data = await getSellerProducts();
      dispatch(setSellerProducts(data.products));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to fetch seller products",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleCreateProduct, handleGetSellerProduct };
}
