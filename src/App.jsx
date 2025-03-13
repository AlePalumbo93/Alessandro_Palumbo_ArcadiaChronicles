import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import GameDetails from "./pages/Game";
import Platform from "./pages/Platform";
import Genre from "./pages/Genre";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import SessionContextProvider from "./context/SessionContextProvider";
import { useContext } from "react";
import SessionContext from "./context/SessionContext";
import SearchGame from "./pages/SearchGame";

function ProtectedRoute() {

  const { session } = useContext(SessionContext)
  
  if (!session) {
    return <Navigate to="/login"/>
  }

  return <Outlet/>
  
}


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/games/:id/:game" element={<GameDetails />}/>
          <Route path="/platform/:platform/:name" element={<Platform />}/>
          <Route path="/games/:genre" element={<Genre />}/>
          <Route path="/search" element={<SearchGame/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/account" element={<Account />}/>
          </Route>
        </Route>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default function Root() {
  return (
    <SessionContextProvider>
      <App/>
    </SessionContextProvider>
  );
}
