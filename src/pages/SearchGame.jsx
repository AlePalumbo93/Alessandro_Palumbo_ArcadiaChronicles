import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import UseFetchCustom from "../hooks/UseFetchCustom";
import Loading from "../components/Loading";
import ComicCard from "../components/card/ComicCard";

export default function SearchGame() {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const query = queryParams.get("query") || ""; // Se non c'è query, assegna una stringa vuota
   const [resultQuery, setResultQuery] = useState('');
   const [ page, setPage ] = useState(1)
   const url = `https://api.rawg.io/api/games?key=4e17114348b7420eb2a8dae9804e1150&dates=2019-01-01,2025-01-01&search=${resultQuery}&page=${page}&page_size=50`;

   const { data, loading, errors } = UseFetchCustom(url);

   useEffect(() => {
      setResultQuery(query);
   }, [query]); // Aggiorna lo stato quando cambia la query

   return (
      <>
      <div className="row justify-content-between align-items-center">
         <h1 className=" text-center">Stai cercando:{resultQuery}</h1>
         <div className="row justify-content-between">
            <div className="col-2 m-0">
               <button onClick={()=> setPage((prev) => prev - 1)} className="comic-button">PREV</button>
            </div>
            <div className="col-2 m-0 ">
               <button onClick={()=> setPage((prev) => prev + 1)} className="comic-button">NEXT</button>
            </div>
         </div>
         {errors && <ErrorMessage errors={errors} /> }
         {loading && <Loading/>}
         {data && data.map((dat)=>(
               <ComicCard key={dat.id} game={dat}/>
         ))}
      </div>
      </>
   );
}
