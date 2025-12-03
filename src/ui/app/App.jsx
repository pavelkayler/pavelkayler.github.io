import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";

import { ContextProvider } from "../../core/context/Context.jsx";
import { routes } from "../../core/routes/routes.jsx";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={routes} />
    </ContextProvider>
  );
}

export default App;
