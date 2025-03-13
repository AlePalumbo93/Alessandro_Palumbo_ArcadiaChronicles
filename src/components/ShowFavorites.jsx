import { useContext, useState, useEffect } from "react"
import supabase from "../supabase/client"
import SessionContext from "../context/SessionContext"
import { useNavigate } from "react-router"
import toast, { Toaster } from 'react-hot-toast';


export default function ShowFavorites() {
   const navigate = useNavigate();
   const { session } = useContext(SessionContext);
   const [ fav , setFav] = useState([]);   

   async function readFavorite() {
      let { data: favorites, error } = await supabase
         .from('favorites')
         .select("*")
         // Filters
         .eq('profile_id',session.user.id)

         if (error) {
            // toast.error('Oh no qualcosa è andato storto');   
         } else {
            setFav(favorites)
         }
   }

   async function deleteFavorite(gam) {
      const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('profile_id',session.user.id)
      .eq('game_id', gam.game_id)
      if (error) {
         toast.error('Oh no qualcosa è andato storto');   
      }else{
         readFavorite()
         toast.success(`${gam.game_name} Eliminato dai preferiti`); 
      }

   }

   useEffect(() => {
      readFavorite() 
   },[fav,session])

   return(
      
      <div className=" row justify-content-center comic-style-container">
         <div className="col-8 comic-style-card">
            <h1>Favoriti</h1>
            {fav.length > 0 ? fav.map((favourite) => (
               <div key={favourite.id} className="card-fav-item d-flex justify-content-between align-items-center">
                  <h2 onClick={() => (navigate(`/games/${favourite.game_id}/${favourite.game_name}`))} className="card-fav-title">{favourite.game_name}</h2>
                  <button className=" comic-button h-50" onClick={() => deleteFavorite(favourite)}>Rimuovi dai Favoriti</button>
               </div>
            ))
            :
            <h2>Nessun gioco nei favoriti</h2>
            }
         </div>
         <Toaster/>
      </div>
   )
}