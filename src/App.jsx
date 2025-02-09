import {
  RouterProvider
} from "react-router";
import  router from "./routes";



function App() {
  return <RouterProvider router={router} />;
}

export default function Root() {
  return <App/>
}
