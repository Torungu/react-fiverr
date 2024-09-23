import React from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";
import { DataProvider } from "./hooks/useData";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = React.createContext();

function App() {
  const routes = useRoutesCustom();
  const showNotification = (content, type, duration = 4000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <>
      <NotificationContext.Provider
        value={{ showNotification: showNotification }}
      >
        <ToastContainer />
        <DataProvider>{routes}</DataProvider>
      </NotificationContext.Provider>
    </>
  );
}

export default App;
