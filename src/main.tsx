import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import ErrorPage from "./views/ErrorPage";
import "./index.css";
import EditContact, { action as editAction } from "./routes/edit";
import { action as deleteAction } from "./routes/delete";
import Index from "./routes";

export type AppParams = {
  contactId: string;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          /* index: true indicates that <Index /> element should be rendered when
            the user is at the exact same path as the parent ("/") in our case  */
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            action: contactAction,
            loader: contactLoader,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            action: editAction,
            loader: contactLoader,
          },
          {
            path: "contacts/:contactId/delete",
            action: deleteAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
