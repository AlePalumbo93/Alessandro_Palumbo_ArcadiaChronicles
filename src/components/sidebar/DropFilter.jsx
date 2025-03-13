import { useEffect, useState } from "react";
import { Link } from "react-router";


export default function DropFilter() {
   
   const url = 'https://api.rawg.io/api/genres?key=4e17114348b7420eb2a8dae9804e1150';
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