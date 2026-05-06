import axios from "axios";

const productApi = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export async function createProduct(formData) {
  try {
    const response = await productApi.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getSellerProducts() {
  try {
    const response = await productApi.get("/seller");
    return response.data;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
}
