import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateAccount from "./UpdateAccount";
import ShowFavorites from "./ShowFavorites";

const ComicTabs = () => {
   const [activeTab, setActiveTab] = useState("tab1");

   return (
      <div className="marvel-tabs-container">
         <ul className="marvel-nav-tabs">
            <li className="marvel-nav-item">
               <button
                  className={`marvel-nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => setActiveTab("tab1")}
               >
                  Modifica Profilo
               </button>
            </li>
            <li className="marvel-nav-item">
               <button
                  className={`marvel-nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => setActiveTab("tab2")}
               >
                  Favoriti
               </button>
            </li>
         </ul>
         <div className="marvel-tab-content">
         {activeTab === "tab1" && (
            <div className="marvel-tab-pane active">
               <UpdateAccount/>
            </div>
         )}
         {activeTab === "tab2" && (
            <div className="marvel-tab-pane active">
               <ShowFavorites/>
            </div>
         )}
         </div>


      </div>
   );
};

export default ComicTabs;
