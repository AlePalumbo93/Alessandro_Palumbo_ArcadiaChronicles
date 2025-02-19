import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GameImage = ({ image }) => {
   return(
      <LazyLoadImage
         alt="Game Image"
         effect="blur"
         wrapperProps={{
            style: {transitionDelay: "0.6s"},
         }}
         src={image} 
      />
   )
};

export default GameImage;