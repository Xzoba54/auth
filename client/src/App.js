import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/form/Login.jsx";
import Register from "./pages/form/Register.jsx";
import { AuthProvider } from "./context/AuthProvider.js";
import Home from "./pages/Home.jsx";
import VerifyToken from "./utils/VerifyToken.jsx";
import FormProtectedRoute from "./routes/FormProtectedRoute.jsx";
import TokenProtectedRoute from "./routes/TokenProtectedRoute.jsx";
import Edit from "./pages/Edit.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/login" />} />

            <Route element={<VerifyToken />}>
              <Route element={<FormProtectedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<TokenProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/edit" element={<Edit />} />
              </Route>

              <Route
                path="*"
                element={
                  <div>
                    <h1>Page not found</h1>
                  </div>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
