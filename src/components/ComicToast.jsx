// components/ComicToast.jsx
import { useEffect } from 'react';

const ComicToast = ({ message, type = 'success', show, onClose }) => {
   useEffect(() => {
      if (show) {
         const timer = setTimeout(() => {
         onClose();
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [show, onClose]);

   if (!show) return null;

   return (
      <div className="comic-toast show">
         <div className="toast-bubble">
         <i className={`fas ${getIcon(type)} toast-icon`} />
         <span className="toast-message">{message}</span>
         <button className="toast-close" onClick={onClose}>&times;</button>
         </div>
      </div>
   );
   };

   const getIcon = (type) => {
   const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-triangle',
      warning: 'fa-exclamation-circle'
   };
   return icons[type] || 'fa-info-circle';
   };

export default ComicToast;