import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import CreateProduct from "../features/products/pages/CreateProduct";
import Login from "../features/auth/pages/Login";
import AdminDashboard from "../features/products/pages/AdminDashboard";
import Home from "../features/main/pages/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "/admin/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);
