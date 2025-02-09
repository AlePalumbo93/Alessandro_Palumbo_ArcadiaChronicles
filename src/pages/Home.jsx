import { useEffect, useState } from "react";

const apiKey = '515124204a8a4596b7c9e0dc56ba478f';
const url = 'https://api.rawg.io/api/games?key=515124204a8a4596b7c9e0dc56ba478f&dates=2019-01-01,2025-01-01&page=1&page_size=50'

export default function Home() {
   const [games, setGames] = useState([]);
   useEffect(()=>{
      const fetchData = async () =>{
         const response = await fetch(url);
         const json = await response.json();
         console.log(json.results);
         
         setGames(json.results);
         
      }
      fetchData()
   },[])

   return(
      <>
         {games.map((game)=>(
            <div key={game.id}>
               <img className=" img-fluid" src={game.background_image} alt="" />
            </div>
         ))}
      </>
   )
}