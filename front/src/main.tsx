import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopPage } from "./pages/top.tsx";
import { AnswerPage } from "./pages/answer.tsx";
import { Layout } from "./components/layout.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./utils/theme.ts";
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
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
