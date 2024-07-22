import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Homepage from "./pages/Homepage.tsx";
import Pricing from "./pages/Pricing.tsx";
import Product from "./pages/Product.tsx";
import Login from "./pages/Login.tsx";
import WebApp from "./pages/WebApp.tsx";
import CityList from "./components/CityList.tsx";
import City from "./components/City.tsx";
import CountryList from "./components/CountryList.tsx";
import Form from "./components/Form.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "app",
        element: <WebApp />,
        children: [
          {
            index: true,
            element: <Navigate replace to="cities" />,
          },
          {
            path: "cities",
            element: <CityList />,
          },
          {
            path: "cities/:id",
            element: <City />,
          },
          {
            path: "countries",
            element: <CountryList />,
          },
          {
            path: "form",
            element: <Form />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
