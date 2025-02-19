import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from "react-router";
import Home from "../pages/Home";
import GameDetails from "../pages/Game";
import Genre from "../pages/Genre";
import Layout from "../layout/Layout";
import Platform from "../pages/Platform";

// You can do this:
const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Layout />}>
         <Route path="/" element={<Home />}/>
         <Route path="/games/:id/:game" element={<GameDetails />}/>
         <Route path="/games/:platform" element={<Platform />}/>
         <Route path="/games/:genre" element={<Genre />}/>
      </Route>
   )
);

export default router;