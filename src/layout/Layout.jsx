import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router";

export default function Layout() {
   return(
      <>
         <Navbar/>
         <div className="container">
            <Outlet/>
         </div>
      </>
   )
}