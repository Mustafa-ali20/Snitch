import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProduct();
  }, [handleGetSellerProduct]);

  console.log(sellerProducts);

  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;
