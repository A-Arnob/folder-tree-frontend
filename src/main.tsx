import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import FileUpload from "./components/FileUpload.tsx";
import SignUp from "./components/Signup.tsx";
import SignIn from "./components/SignIn.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <SignUp />
    </BrowserRouter>
  </React.StrictMode>
);
