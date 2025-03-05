import toast, { Toaster } from 'react-hot-toast';
import supabase from "../supabase/client"
import RealTimeChat from './RealTimeChat';



export default function Chat({ game, session }) {

   

   async function handleMessageSubmit(event) {
      event.preventDefault();
      const inputMessage = event.currentTarget;
      const { message } = Object.fromEntries(new FormData(inputMessage));
      if (typeof message === "string" && message.trim().length !== 0) {
         const { data, error } = await supabase
            .from('messages')
            .insert([
               {  
                  profile_id: session.user.id,
                  profile_username: session.user.user_metadata.username,
                  game_id: game.id,
                  content : message
               },
            ])
            .select();

         if (error) {
            toast.error('Oh no qualcosa è andato storto');   
         }else{
            toast.success(`Messaggio inviato correttamente`); 
            inputMessage.reset();
            console.log(data, "risposta messaggio");
            
         }
      }
      console.log(message);
      
   }

   return(

      <div className="contenitore-chat">
         <RealTimeChat game={game}/>
         
         <div className="area-input">
               <form className="d-flex gap-2" onSubmit={handleMessageSubmit}>
                  <input type="text" name="message" className="form-control input-fumetto" placeholder="Scrivi un messaggio..."/>
                  <button type="submit" className="btn pulsante-fumetto">Invia</button>
               </form>
         </div>
         <Toaster/>
      </div>
   )
}