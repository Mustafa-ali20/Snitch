import "./App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import Loader from "../features/main/components/Loader";
import Navbar from "../features/main/components/layout/Navbar";

function App() {
  return (
    <>
      <Loader onDone={() => {}} />
      <Navbar />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
