import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App.jsx";
import { AuthorizationContextProvider } from "./Components/Contexts/authorizationContext";

ReactDOM.render(
  <AuthorizationContextProvider>
    <App />
  </AuthorizationContextProvider>,
  document.getElementById("root")
);
