import { Link, useNavigate } from "react-router";
import  logo  from "../../media/arcadiaChronicles.png";
import { useContext, useEffect, useState } from "react";
import supabase from "../../supabase/client";
import toast, { Toaster } from 'react-hot-toast';
import SessionContext from "../../context/SessionContext";
import SearchBar from "./SearchBar";

export default function Navbar() {

   const { session } = useContext(SessionContext)
   const [avatar_url, setAvatarUrl] = useState(null)
   const [username, setUsername] = useState(null)

   
   const navigate = useNavigate()
   
   const signOut = async () => {
      await supabase.auth.signOut()
      toast.success('Log Out avvenuto con successo'); 
      await new Promise((resolve) => setTimeout(resolve,1000));
      navigate("/")
   }

   useEffect(() => {
      let ignore = false
      async function getProfile() {

         if (session) {
            const { user } = session
   
            const { data, error } = await supabase
            .from('profiles')
            .select(`username, avatar_url`)
            .eq('id', user.id)
            .single()
   
            if (!ignore) {
            if (error) {
               console.warn(error)
            } else if (data) {
               setUsername(data.username)
               setAvatarUrl(data.avatar_url)
            }
            }
   
         }
            
         }

      getProfile()

      return () => {
         ignore = true
      }
   }, [session])

   return(
      <>
      <nav className="navbar navbar-expand-lg py-0">
         <div className="container">
            <a className="navbar-brand" href="#"><img className="logo" src={logo} alt="" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
               <div>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link className="nav-link active fontNav" to="/">Home</Link>
                     </li>
                  </ul>
               </div>
               <SearchBar/>
               {session ? (
                  <div className="nav-item dropdown ms-2 d-flex align-items-center">
                     <img 
                        src={`https://jpnmkookouqhjphgynmu.supabase.co/storage/v1/object/public/avatars//${avatar_url}`} 
                        alt="Avatar" 
                        className="rounded-circle border border-dark me-2" 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                     />
                     <a className="nav-link dropdown-toggle fontNav" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {session && username}
                     </a>
                     <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/account">Dashboard</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" onClick={signOut}>Esci</Link></li>
                     </ul>
                  </div>
               ):(
                  <div>
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li><Link className="nav-link active fontNav" to="/register">Registrati</Link></li>
                        <li><Link className="nav-link active fontNav" to="/login">Accedi</Link></li>
                     </ul>
                  </div>
               )}
            </div>
         </div>
         
      </nav>
      <Toaster/>
      </>
   )
}