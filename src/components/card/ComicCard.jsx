import { useState } from "react";
import GameImage from "../GameImage";
import { useNavigate } from "react-router";


const ComicCard = ({game}) => {
   // console.log(game);
   const [hidden, setHidden] = useState(false);
   const genres = game.genres.map((genre)=> genre.name).join(', ');
   const platforms = game.platforms.map((plat)=> plat.platform.name).join(', ');
   const navigate = useNavigate();
   
   
   return (
      <div className={`card-custom col-12 col-lg-3 m-4 ${hidden ? "card-hover" : ""}`} onMouseEnter={()=> setHidden(true)} onMouseLeave={()=> setHidden(false)} onClick={()=> navigate(`/games/${game.id}/${game.name}`)}>
         <div className="card-image">
            <GameImage image={game.background_image}/>
            
         </div>
         <div className="card-body">
            <h2 className="card-title">{game.name}</h2>
            <div className="text-content mb-2 border-top border-5 border-black mb">
               <div className="text-left">
                  <span>VOTO</span>
               </div>
               <div className="text-right">
                  <span>{game.rating}</span>
               </div>
            </div>
            {hidden &&  <div className="text-content border-top border-5 border-black mb">
                           <div className="text-left">
                              <h3>GENERI</h3>
                              <span> {genres}</span>
                           </div>
                        </div>}
            {hidden &&  <div className="text-content border-top border-5 border-black mb">
                           <div className="text-left">
                              <h3>PIATTAFORME</h3>
                              <span> {platforms}</span>
                           </div>
                        </div>}
         </div>
      </div>

   );
};

export default ComicCard;
