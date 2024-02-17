import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {TopPage} from "./pages/top.tsx";
import {AnswerPage} from "./pages/answer.tsx";
import {Layout} from "./components/layout.tsx";
import { ChakraProvider } from '@chakra-ui/react';
import "./index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TopPage />,
      },
      {
        path: "/pages/:pageTitle",
        element: <AnswerPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
