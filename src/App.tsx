import { HelmetProvider } from "react-helmet-async";
import useRouteElements from "./core/routes/useRouteElements";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { AppContext } from "./core/contexts/app.context";
import { LocalStorageEventTarget } from "./core/utils/auth";

function App() {
  const routeElements = useRouteElements();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearLS", reset);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [reset]);
  return (
    <HelmetProvider>
      {routeElements}
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
