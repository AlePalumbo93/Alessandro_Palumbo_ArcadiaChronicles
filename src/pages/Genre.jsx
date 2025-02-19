import { useEffect, useState } from "react";
import { useParams } from "react-router"
import ComicCard from "../components/card/ComicCard";


export default function Genre() {
   const [games, setGames] = useState([]);
   const { genre } = useParams()
   console.log(genre);
   
      useEffect(()=>{
         const fetchData = async () =>{
            const response = await fetch(`https://api.rawg.io/api/games?key=515124204a8a4596b7c9e0dc56ba478f&genres=${genre}&page=1`);
            const json = await response.json();
            console.log(json.results);
            setGames(json.results)
         }
         fetchData()
      },[genre])
   

   return(
      <>
         <h1 className=" text-center">{genre.toUpperCase()}</h1>
         <div className="row justify-content-between align-items-center">
         {games.map((game)=>(
               <ComicCard key={game.id} game={game}/>
         ))}
      </div>
      </>
   )
}