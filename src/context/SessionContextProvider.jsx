import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client";

export default function SessionContextProvider({ children }) {
   const [session, setSession] = useState(() => {
      // Recupera la sessione salvata in localStorage (se presente)
      const savedSession = localStorage.getItem("session");
      return savedSession ? JSON.parse(savedSession) : null;
   });

   const [user, setUser] = useState(null);

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         if (event === "SIGNED_OUT") {
            setSession(null);
            localStorage.removeItem("session"); // Rimuove la sessione salvata
         } else if (session) {
            setSession(session);
            localStorage.setItem("session", JSON.stringify(session)); // Salva la sessione
         }
      });

      return () => {
         subscription.unsubscribe();
      };
   }, []);

   useEffect(() => {
      const getUser = async () => {
         const {
         data: { user },
         } = await supabase.auth.getUser();
         setUser(user);
      };
      getUser();
   }, [session]);

   return (
      <SessionContext.Provider value={{ session, user }}>
         {children}
      </SessionContext.Provider>
   );
}
