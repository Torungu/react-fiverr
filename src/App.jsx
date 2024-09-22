import React from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";
import { DataProvider } from "./hooks/useData";

function App() {
  const routes = useRoutesCustom();
  return (
    <>
      <DataProvider>{routes}</DataProvider>
    </>
  );
}

export default App;
