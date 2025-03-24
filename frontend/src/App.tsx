import { RouterProvider } from "react-router";
import { router } from "./router/router";

export default function App() {
  return (
    <div className="bg-slate-200 text-white h-screen w-screen">
      <RouterProvider router={router} />
    </div>
  );
}
