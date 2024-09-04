import React from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";

function App() {
  const routes = useRoutesCustom();
  return <>{routes}</>;
}

export default App;
