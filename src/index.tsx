import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactGA from "react-ga4";

const googleAnalyticTrackingId: string =
  process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID ?? "";

if (!googleAnalyticTrackingId || googleAnalyticTrackingId.length === 0)
  throw Error("REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID" + " not found");

const oauthConsentClientId: string =
  process.env.REACT_APP_OAUTH_CONSENT_SCREEN ?? "";

if (!oauthConsentClientId || oauthConsentClientId.length === 0)
  throw Error("REACT_APP_OAUTH_CONSENT_SCREEN" + " not found");

ReactGA.initialize(googleAnalyticTrackingId);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={oauthConsentClientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </GoogleOAuthProvider>
);
