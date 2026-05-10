import "./App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import Loader from "../features/main/components/Loader";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hook/useAuth";

function App() {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <Loader onDone={() => {}} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
