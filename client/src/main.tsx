import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3aw1g306endiokup.us.auth0.com"
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
