import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root.jsx";
import UserDetails from "./UserDetails.jsx";
import Update from "./Update.jsx";

const route = createBrowserRouter([
  { path: "/", Component: Root, children: [{ 
    index: true, Component: App},

    {
      path:"/users/:id",
      loader:({params}) => fetch(`http://localhost:5000/users/${params.id}`),
      Component:UserDetails,
    },
    {
      path:"/update/:id",
      Component:Update,
      loader:({params}) => fetch(`http://localhost:5000/users/${params.id}`)
    }
  
  ]},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
