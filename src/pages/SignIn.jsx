import { useNavigate } from "react-router";
import supabase from "../supabase/client";
import toast, { Toaster } from 'react-hot-toast';


export default function SignIn() {
   
   const navigate = useNavigate()
   
   const handleSingIn = async (event) =>{
      event.preventDefault();
      const formRegister = event.currentTarget;
      const { email, password } = Object.fromEntries(new FormData(formRegister));

      let { data, error } = await supabase.auth.signInWithPassword({
         email,
         password
      })

      if (error) {
         formRegister.reset();
         toast.error('Oh no qualcosa è andato storto');   
      } else {
         formRegister.reset();
         toast.success('LogIn effettuato con successo'); 
         await new Promise((resolve) => setTimeout(resolve,2000))
         navigate("/")
      }
   }

   
   return(
   <div className="container">
      <div className="row justify-content-center mt-5 pt-5">
            <div className="col-md-6">
               <div className="graphicnovel-container">
                  <h1 className="cartoon-title">ACCEDI</h1>
                  <form onSubmit={handleSingIn}>
                        <div className="mb-4 position-relative">
                           <input type="email" className="form-control popart-input" placeholder="Email" required name="email"/>
                        </div>
                        <div className="mb-4 position-relative">
                           <input type="password" className="form-control popart-input" placeholder="Password" required name="password"/>
                        </div>
                        <button type="submit" className="btn pow-button w-100">ENTRA</button>
                  </form>
               </div>
            </div>
      </div>
      <Toaster/>
   </div>
   )
}