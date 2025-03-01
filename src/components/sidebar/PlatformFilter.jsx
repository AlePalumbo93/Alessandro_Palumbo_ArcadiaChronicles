import { useEffect, useState } from "react";
import { Link } from "react-router";

const urlPlatforms = 'https://api.rawg.io/api/platforms?key=4e17114348b7420eb2a8dae9804e1150';

export default function PlatformFilter() {
   const [platforms, setPlatforms] = useState([]);

   useEffect(()=>{
      const fetchData = async () =>{
         const response = await fetch(urlPlatforms);
         const json = await response.json();            
         setPlatforms(json.results)
      }
      fetchData()
   },[])

   return(
      <>
      <div className="dropdown col-12 mb-3">
         <button className="btn comic-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
               Piattaforme
         </button>
         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
               {platforms.map((platform) => (
                  <li key={platform.id}>
                     <Link className="dropdown-item" to={`/games/${platform.id}`}>{platform.name}</Link>
                  </li>
               ))}
         </ul>
      </div>
      </>
   )
}