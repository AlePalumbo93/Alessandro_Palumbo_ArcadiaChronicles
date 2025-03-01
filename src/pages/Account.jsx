import { useContext } from "react";
import ComicTabs from "../components/ComicTabs";
import SessionContext from "../context/SessionContext";

export default function Account() {
   const { session, user } = useContext(SessionContext)
   return(
      <><div className="row justify-content-center">
         <h1 className=" text-center bg-white w-50 p-2 border border-2 rounded-pill border-black shadow">Account di: {user && user.user_metadata.email}</h1>
      </div>
      <div className="row justify-content-center">
         <div className="col-12 col-md-6">
            <ComicTabs/>
         </div>
      </div>
      </>
   )
}