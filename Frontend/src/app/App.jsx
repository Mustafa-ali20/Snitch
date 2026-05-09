import "./App.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import Loader from "../features/main/components/Loader";

function App() {
  return (
    <>
      <Loader onDone={() => {}} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
