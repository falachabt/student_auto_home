import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import { ContextProvider } from "./Contexts/ContextProvider";
import { registerLicense } from '@syncfusion/ej2-base'
import { syncfusion_key } from "./data";

const root = ReactDOM.createRoot(document.getElementById("root"));

// syncfusion licensing
registerLicense(syncfusion_key)



root.render(
  <React.StrictMode>
    <AuthProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
