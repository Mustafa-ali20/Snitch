import { createBrowserRouter, Outlet } from "react-router";
import Register from "../features/auth/pages/Register";
import CreateProduct from "../features/products/pages/CreateProduct";
import Login from "../features/auth/pages/Login";
import AdminDashboard from "../features/products/pages/AdminDashboard";
import Home from "../features/main/pages/Home";
import Navbar from "../features/main/components/layout/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
    ]
  },
  { path: "/admin/create-product", element: <CreateProduct /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
]);