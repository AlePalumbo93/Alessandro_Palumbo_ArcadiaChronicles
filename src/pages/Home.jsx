import { useEffect, useState } from "react";
import ComicCard from "../components/card/ComicCard";
import UseFetchCustom from "../hooks/UseFetchCustom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";



export default function Home() {
   const [ page, setPage ] = useState(1)
   
   const url = `https://api.rawg.io/api/games?key=4e17114348b7420eb2a8dae9804e1150&dates=2019-01-01,2025-01-01&page=${page}&page_size=50`;
   
   const { data, loading, errors } = UseFetchCustom(url);

   return(
      <>
      <div className="row justify-content-between align-items-center">
         <h1 className=" text-center">GIOCHI IN PRIMO PIANO</h1>
         <div className="row justify-content-between">
            <div className="col-2 m-0">
               <button onClick={()=> setPage((prev) => prev - 1)} className="comic-button" disabled={page <= 1}>PREV</button>
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
   )
}