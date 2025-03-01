import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import toast, { Toaster } from 'react-hot-toast';


export default function SignUp() {
   
   const navigate = useNavigate()
   
   const handleSingUp = async (event) =>{
      event.preventDefault();
      const formRegister = event.currentTarget;
      const { email, password, username, first_name, last_name  } = Object.fromEntries(new FormData(formRegister));

      let { data, error } = await supabase.auth.signUp({
         email,
         password,
         options:{
            data:{
               username,
               first_name,
               last_name
            }
         }
      })

      if (error) {
         formRegister.reset();
         toast.error('Oh no qualcosa è andato storto');   
      } else {
         formRegister.reset();
         toast.success('Registrazione avvenuta con successo'); 
         await new Promise((resolve) => setTimeout(resolve,2000))
         navigate("/")
      }
   }

   
   return(
   <div className="container">
      <div className="row justify-content-center mt-3">
            <div className="col-md-6">
               <div className="graphicnovel-container">
                  <h1 className="cartoon-title">REGISTRAZIONE</h1>
                  <form onSubmit={handleSingUp}>
                        <div className="mb-3 position-relative">
                           <input type="username" className="form-control popart-input" placeholder="Nome User" required name="username"/>
                        </div>
                        <div className="mb-3 position-relative">
                           <input type="Nome" className="form-control popart-input" placeholder="Nome Utente" required name="first_name"/>
                        </div>
                        <div className="mb-3 position-relative">
                           <input type="last_name" className="form-control popart-input" placeholder="Cognome" required name="last_name"/>
                        </div>
                        <div className="mb-4 position-relative">
                           <input type="email" className="form-control popart-input" placeholder="Email" required name="email"/>
                        </div>
                        <div className="mb-4 position-relative">
                           <input type="password" className="form-control popart-input" placeholder="Password" required name="password"/>
                        </div>
                        <button type="submit" className="btn pow-button w-100">Registrati</button>
                        <div className="text-center mt-3">
                           <span className=" action-link">Sei gia registrato?</span> <span><Link to="/login" >LogIn</Link></span>
                        </div>
                  </form>
               </div>
            </div>
      </div>
      <Toaster/>
   </div>
   )
}