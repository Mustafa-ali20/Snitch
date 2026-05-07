import { getAllProducts, createProduct } from "../services/product.api";
import { setError, setProducts, setLoading } from "../state/product.slice";
import { useDispatch } from "react-redux";

export function useProduct() {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      dispatch(setLoading(true));
      const data = await createProduct(formData);
      await handleGetAllProducts();
      return data.product;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to create product"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetAllProducts() {
    try {
      dispatch(setLoading(true));
      const data = await getAllProducts();
      dispatch(setProducts(data.products));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch products"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleCreateProduct, handleGetAllProducts }; 
}
