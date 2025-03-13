import { useEffect, useState } from "react";
import { useParams } from "react-router"
import ComicCard from "../components/card/ComicCard";


export default function Platform() {
   const [games, setGames] = useState([]);
   const { platform, name } = useParams()

   
   
      useEffect(()=>{
         const fetchData = async () =>{
            const response = await fetch(`https://api.rawg.io/api/games?key=4e17114348b7420eb2a8dae9804e1150&platforms=${platform}&page=1`);
            const json = await response.json();
            console.log(json.results);
            
            setGames(json.results)
         }
         fetchData()
      },[platform])
   

   return(
      <>
         <h1 className=" text-center">{name}</h1>
         <div className="row justify-content-between align-items-center">
         {games.map((game)=>(
               <ComicCard key={game.id} game={game}/>
         ))}
      </div>
      </>
   )
}