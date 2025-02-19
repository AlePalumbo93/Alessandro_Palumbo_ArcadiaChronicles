import { useEffect, useState } from "react";
import { useParams } from "react-router"
import ComicCard from "../components/card/ComicCard";


export default function Platform() {
   const [games, setGames] = useState([]);
   const { platform } = useParams()
   console.log();
   
      useEffect(()=>{
         const fetchData = async () =>{
            const response = await fetch(`https://api.rawg.io/api/games?key=515124204a8a4596b7c9e0dc56ba478f&platforms=${platform}&page=1`);
            const json = await response.json();
            console.log(json.results);
            
            setGames(json.results)
         }
         fetchData()
      },[platform])
   

   return(
      <>
         <h1 className=" text-center">PIATTAFORMA</h1>
         <div className="row justify-content-between align-items-center">
         {games.map((game)=>(
               <ComicCard key={game.id} game={game}/>
         ))}
      </div>
      </>
   )
}