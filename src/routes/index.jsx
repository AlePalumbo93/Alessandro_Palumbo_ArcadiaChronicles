import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from "react-router";
import Layout from "../layout/layout";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Genre from "../pages/Genre";

// You can do this:
const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Layout />}>
         <Route path="/" element={<Home />}/>
         <Route path="/games/games-name" element={<Game />}/>
         <Route path="/games/genre" element={<Genre />}/>
      </Route>
   )
);

export default router;