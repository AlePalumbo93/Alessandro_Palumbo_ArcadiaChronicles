import { Link, useNavigate } from "react-router";
import  logo  from "../../media/arcadiaChronicles.png";
import { useContext } from "react";
import supabase from "../../supabase/client";
import toast, { Toaster } from 'react-hot-toast';
import SessionContext from "../../context/SessionContext";

export default function Navbar() {

   const { session, user} = useContext(SessionContext)
   console.log(user);
   
   const navigate = useNavigate()
   
   const signOut = async () => {
      await supabase.auth.signOut()
      toast.success('Log Out avvenuto con successo'); 
      await new Promise((resolve) => setTimeout(resolve,1000));
      navigate("/")
   }

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
                     <li className="nav-item">
                        <a className="nav-link fontNav" href="#">Link</a>
                     </li>
                  </ul>
               </div>
               <div className=" w-75">
                  <form className="d-flex" role="search">
                  <input className="form-control me-2 rounded-5 searchBar"  type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success rounded-5 fontNav" type="submit">Search</button>
                  </form>
               </div>
               {session ? (
                  <div className="nav-item dropdown ms-2">
                     <a className="nav-link dropdown-toggle fontNav" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user && user.user_metadata.email}
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