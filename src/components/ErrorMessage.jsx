export default function ErrorMessage({errors}) {
   return(
      <div className="row justify-content-center">
         <div className="comic-alert w-50">
            {errors}
         </div>
      </div>
   )
}