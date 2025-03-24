import Connection from "../pages/Connection";
import Home from "../pages/Home";
import Post from "../pages/Post";
import User from "../pages/User";

export const ROUTES = [
  {
    path: "/",
    element: <Connection />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Post/:id",
    element: <Post />,
  },
  {
    path: "/User/:name",
    element: <User />,
  },
];
