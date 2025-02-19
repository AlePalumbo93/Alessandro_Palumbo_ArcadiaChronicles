import { useEffect, useState } from "react";
import { Link } from "react-router";

const url = 'https://api.rawg.io/api/genres?key=515124204a8a4596b7c9e0dc56ba478f';

export default function DropFilter() {

   const [genres, setGenres] = useState([]);

      useEffect(()=>{
         const fetchData = async () =>{
            const response = await fetch(url);
            const json = await response.json();
            setGenres(json.results)
         }
         fetchData()
      },[])


   return(
      <>
      <div className="row">
         <div className="dropdown col-12 mb-3">
            <button className="btn comic-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  Generi
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {genres.map((genre) => (
                     <li key={genre.id}>
                        <Link className="dropdown-item" to={`/games/${genre.slug}`}>{genre.name}</Link>
                     </li>
                  ))}
            </ul>
         </div>
      </div>
      </>
   )
}