import { useContext, useEffect, useRef, useState } from "react"
import supabase from "../supabase/client";
import Loading from "./Loading";
import SessionContext from "../context/SessionContext";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export default function RealTimeChat({game}) {
   const { session } = useContext(SessionContext);
   const [ loading, setLoading ] = useState(false);
   const [ messages, setMessages ] = useState([]);
   const [ errors, setErrors ] = useState('');
   const messageRef = useRef(null)
   

   function scrollToBottom() {
      if (messageRef.current) {
         messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
   }
   
   async function getMessage() {
      setLoading(true)
      let { data: messages, error } = await supabase
         .from('messages')
         .select("*")

         // Filters
         .eq('game_id', game.id);

         if (error) {
            setErrors(error.message)
         }else{
            setMessages(messages)
         }
         setLoading(false)

   }

   useEffect(() => {
      if (game) {
         getMessage()
      }
      const channel = supabase
      .channel('messages')
      .on(
         'postgres_changes',
         {
            event: '*',
            schema: 'public',
            table: 'messages',
         },
         () => getMessage()
      )
      .subscribe();

      return () => {
         if (channel) {
            supabase.removeChannel(channel);
         }
         channel.unsubscribe()
      }

   },[game])

   useEffect(() => {
      scrollToBottom()
   },[messages])

   return(

      <div className="area-messaggi" ref={messageRef}>
         {loading && <Loading/>}
         {messages.length > 0 ? messages.map((message) => (
            <div key={message.id} className="messaggio ricevuto"  ref={messageRef} >
               <h6>Utente: {message.profile_username}</h6>
               <p>{message.content}</p>
               <span>{dayjs().to(dayjs(message.created_at))}</span>
            </div>

         )) :
         <article>Nessun messaggio disponibile</article>
         }

      </div>
   )
}