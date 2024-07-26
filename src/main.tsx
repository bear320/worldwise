import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.tsx";
import CityList from "./components/CityList.tsx";
import City from "./components/City.tsx";
import CountryList from "./components/CountryList.tsx";
import Form from "./components/Form.tsx";
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";
import "./index.css";

const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const Homepage = lazy(() => import("./pages/Homepage.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const WebApp = lazy(() => import("./pages/WebApp.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<SpinnerFullPage />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "pricing",
        element: <Suspense fallback={<SpinnerFullPage />}>{<Pricing />}</Suspense>,
      },
      {
        path: "product",
        element: <Suspense fallback={<SpinnerFullPage />}>{<Product />}</Suspense>,
      },
      {
        path: "login",
        element: <Suspense fallback={<SpinnerFullPage />}>{<Login />}</Suspense>,
      },
      {
        path: "app",
        element: <Suspense fallback={<SpinnerFullPage />}>{<WebApp />}</Suspense>,
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
