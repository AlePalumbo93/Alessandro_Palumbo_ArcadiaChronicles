import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router";
import DropFilter from "../components/sidebar/DropFilter";
import PlatformFilter from "../components/sidebar/PlatformFilter";

export default function Layout() {
   return(
      <>
         <Navbar/>
         <div className="container-fluid">
            <div className="row">
               <div className="col-2  border-end border-black border-5 pt-2">
                  <DropFilter/>
                  <PlatformFilter/>
               </div>
               <div className=" col-10">
                  <Outlet/>
               </div>
            </div>
         </div>
      </>
   )
}