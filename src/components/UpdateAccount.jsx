import { useState, useEffect, useContext } from 'react'
import supabase from '../supabase/client'
import SessionContext from '../context/SessionContext'
import Avatar from './Avatar'
import toast from 'react-hot-toast'


export default function UpdateAccount() {
   const { session } = useContext(SessionContext)
   const [loading, setLoading] = useState(true)
   const [username, setUsername] = useState(null)
   const [first_name, setFirstName] = useState(null)
   const [last_name, setLastName] = useState(null)
   const [avatar_url, setAvatarUrl] = useState(null)

   useEffect(() => {
      let ignore = false
      async function getProfile() {
         setLoading(true)
         const { user } = session

         const { data, error } = await supabase
         .from('profiles')
         .select(`username, first_name, last_name, avatar_url`)
         .eq('id', user.id)
         .single()

         if (!ignore) {
         if (error) {
            console.warn(error)
         } else if (data) {
            setUsername(data.username)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setAvatarUrl(data.avatar_url)
         }
         }

         setLoading(false)
      }

      getProfile()

      return () => {
         ignore = true
      }
   }, [session])

   async function updateProfile(event, avatarUrl) {
      event.preventDefault()
      setLoading(true)
      const { user } = session

      const updates = {
         id: user.id,
         username,
         first_name,
         last_name,
         avatar_url: avatarUrl,
         updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
         alert(error.message)
      } else {
         setAvatarUrl(avatarUrl)
      }
      toast.success('Profilo aggiornato con successo')
      setLoading(false)
   }

   return (
      <div className="row justify-content-center comic-style-container">
         <div className="col-8 comic-style-card">
         <form onSubmit={updateProfile} className="comic-style-form">
            <div className="text-center">
               <Avatar
               url={avatar_url}
               size={150}
               onUpload={(event, url) => {
                  updateProfile(event, url)
               }}
               />
            </div>
            <div className="comic-style-form-group">
               <label htmlFor="email" className="comic-style-label">Email</label>
               <input
               id="email"
               type="text"
               className="comic-style-input"
               value={session.user.email}
               disabled
               />
            </div>
            <div className="comic-style-form-group">
               <label htmlFor="username" className="comic-style-label">UserName</label>
               <input
               id="username"
               type="text"
               className="comic-style-input"
               required
               value={username || ''}
               onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="comic-style-form-group">
               <label htmlFor="first_name" className="comic-style-label">Nome</label>
               <input
               id="first_name"
               type="text"
               className="comic-style-input"
               value={first_name || ''}
               onChange={(e) => setFirstName(e.target.value)}
               />
            </div>
            <div className="comic-style-form-group">
               <label htmlFor="last_name" className="comic-style-label">Cognome</label>
               <input
               id="last_name"
               type="text"
               className="comic-style-input"
               value={last_name || ''}
               onChange={(e) => setLastName(e.target.value)}
               />
            </div>
            <div className="comic-style-button-group">
               <button className="comic-style-btn comic-style-btn-primary" type="submit" disabled={loading}>
               {loading ? 'Caricamento ...' : 'Aggiorna'}
               </button>
            </div>
            <div className="comic-style-button-group">
               <button
               className="comic-style-btn comic-style-btn-secondary"
               type="button"
               onClick={() => supabase.auth.signOut()}
               >
               Esci
               </button>
            </div>
         </form>
         </div>
      </div>
   )
}
