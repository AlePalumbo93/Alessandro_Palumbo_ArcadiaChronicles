import { useEffect, useState } from "react";


export default function UseFetchCustom(initialUrl) {
   const [ data, setData ] = useState([]);
   const [ loading , setLoading ] = useState(false);
   const [ errors, setErrors ] = useState(null)

   useEffect(()=>{
      if (!initialUrl) {
         return;
      }

      const fetchData = async () =>{
         try {
            setLoading(true)
            const response = await fetch(initialUrl);
            if (response.ok) {
               const json = await response.json();         
               setData(json.results); 
               console.log(json);
            } else {
               const json = await response.json();         
               setErrors(json);   
            }
            
         } catch (error) {
            setErrors(`Qualcosa è andato storto - ${error.message}`)
         }
         setLoading(false)
      }
      fetchData()
   },[initialUrl])



   return{
      data,
      loading,
      errors,
      setData
   }
}