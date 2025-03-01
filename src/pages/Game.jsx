import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import toast, { Toaster } from 'react-hot-toast';

export default function GameDetails() {

   const { session } = useContext(SessionContext)
   const {id} = useParams();
   const [game, setGame] = useState([])
   const [ fav , setFav] = useState([])

      useEffect(()=>{
         const fetchData = async () =>{
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=4e17114348b7420eb2a8dae9804e1150`);
            const json = await response.json();
            setGame(json)
         }
         fetchData()
      },[id])
   
      async function addFavorite(gam) {
         const { data, error } = await supabase
         .from('favorites')
         .insert([
            { 
               profile_id: session.user.id, 
               game_id: gam.id, 
               game_name: gam.name
            },
         ])
         .select()

         if (error) {
            toast.error('Oh no qualcosa è andato storto');   
         } else {
            toast.success(`${game.name} Aggiunto ai preferiti`); 

         }
      }

      async function readFavorite() {
         let { data: favorites, error } = await supabase
            .from('favorites')
            .select("*")
            // Filters
            .eq('profile_id',session.user.id)
            .eq('game_id', game.id)

            if (error) {
               toast.error('Oh no qualcosa è andato storto');   
            } else {
               setFav(favorites)
            }
      }

      
      async function deleteFavorite(gam) {
         const { error } = await supabase
         .from('favorites')
         .delete()
         .eq('profile_id',session.user.id)
         .eq('game_id', gam.id)
         if (error) {
            toast.error('Oh no qualcosa è andato storto');   
         }else{
            readFavorite()
            toast.success(`${game.name} Eliminato dai preferiti`); 
         }

      }

      
      useEffect(() => {
         if (session) {
            readFavorite() 
         }
      },[game, fav])



   return(
      <>

         <div className="row gap-3 mb-3 px-3">
            <div className="col-12 border border-black border-5 bg-white d-flex justify-content-between align-content-center">
               <div>
                  <h2>{game.name}</h2>
                  <p>VOTO: {game.rating}</p>
               </div>
               {session && (
                  <div className=" d-flex justify-content-center align-items-center">
                     {fav.length == 0 
                     ? 
                     <button className=" comic-button h-50" onClick={() => addFavorite(game)}>Aggiungi ai preferiti</button>
                     :
                     <button className=" comic-button h-50" onClick={() => deleteFavorite(game)}>Rimuovi dai Favoriti</button>
                     }
                     
                  </div>
               )}
               
            </div>
            <div className="col-12 border border-black border-5 p-0">
               <img className=" img-fluid " src={game.background_image} alt="" />
            </div>
            <div className="col-12 border border-black border-5 bg-white">
               <p className="">{game.description_raw}</p>
            </div>
         </div>
         <Toaster/>
      </>
   )
}