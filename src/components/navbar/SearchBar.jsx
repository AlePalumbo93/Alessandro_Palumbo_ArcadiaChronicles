import { useState } from "react"
import { useNavigate } from "react-router";

export default function SearchBar() {
   const [ searchResult , setSearchResult ] = useState('')
   const navigate = useNavigate()

   function handleSearch(e) {
      e.preventDefault()
      if (searchResult.trim()) {
         navigate(`/search?query=${encodeURIComponent(searchResult)}`);
      }
   }


   return(
      <div className=" w-75">
         <form onSubmit={handleSearch} className="d-flex" role="search">
            <input 
            className="form-control me-2 rounded-5 searchBar" 
            type="search"
            placeholder="Cerca tra migliaia di giochi" 
            aria-label="Search"
            onChange={(e) => setSearchResult(e.target.value)}/>
            <button className="btn btn-outline-success rounded-5 fontNav" type="submit">Search</button>
         </form>
      </div>
   )
}