import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function GameDetails() {

   const {id} = useParams();
   const [game, setGame] = useState([])
   console.log(id);

      useEffect(()=>{
         const fetchData = async () =>{
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=515124204a8a4596b7c9e0dc56ba478f`);
            const json = await response.json();
            console.log(json);
            setGame(json)
         }
         fetchData()
      },[id])
   

   return(
      <>
      <div className=" container">
         <div className="row justify-content-center gap-3 mb-3">
            <div className="col-12 border border-black border-5 bg-white">
               <h2>{game.name}</h2>
               <p>VOTO: {game.rating}</p>
            </div>
            <div className="col-12 border border-black border-5 p-0">
               <img className=" img-fluid " src={game.background_image} alt="" />
            </div>
         </div>
      </div>

      <div className="row justify-content-center gap-3 mx-0">
         <div className="col-12 border border-black border-5 bg-white">
            <p className="">{game.description_raw}</p>
         </div>
      </div>

      </>
   )
}