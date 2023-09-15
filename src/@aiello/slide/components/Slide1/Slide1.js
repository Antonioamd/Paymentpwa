import React, {useMemo,useState,useEffect} from 'react';
import Link from '@magento/venia-ui/lib/components/Link';
import PopUp from '../PopUp';
import { useQuery} from '@apollo/client';
import parse from 'html-react-parser';
import RichText from '@magento/venia-ui/lib/components/RichText';
import classes from './Slide.css';
import productOperations from './Slide.gql';
import Prodottinew from '../Prodottinew';
const Slide1 = () => {
  const slides = [
    
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];
  //const [productSku,setProductSku]=useState("VA12-SI-NA")
  const [showButton, setShowButton]=useState(' Clicca Qui');
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  let bottone= null;
 const showPopupHandler = () => {setShowPopUp(true);
setShowButton('');
}; 
useEffect(() => {
  setTimeout(
    () =>
      setIndex((prevIndex) =>
        prevIndex === colors.length - 1 ? 0 : prevIndex + 1
      ),
    delay
  );
  return () => {};
}, [index]);
  useEffect(() => {
  
  const timer = setTimeout(() => {
    
  setShowPopUp(false);
 
}, 5000);  return () => clearTimeout(timer);  }, [showPopUp]);
let popup = null;
  if(showPopUp) {
    popup = <PopUp />;
    
   }
   
   
    bottone =<button class="ring-2 ring-blue-500 text-xl align-center  text-[#50d71e]" className={classes.bottone} id="bottonefavore"
   onClick={showPopupHandler}><font color="red"> Clicca Qui</font></button>;
  return (

    <div>
      <div class="grid grid-cols-3 gap-4 ">
      <Link className={classes.linkcart} to="/greeting">
        <div className={classes.testcart}>
           Test Pagamento
        </div>
        </Link>
                <div class="px-20">
                         <div>
                               <span className={classes.hellopwa} >
                                
                                </span>
                                <br></br>
                              <button  className={classes.bottone} 
                          onClick={showPopupHandler}><font color="red">{showButton}</font></button>
                          
                       </div>
                       

                   <div>
{popup}
   
                       </div></div>
        </div>
      
      <div class="object-center h-600 bg-sky-500/100 divide-x-4 px-30 pt-12 pr-15 pl-20 max-w-5xl"className={classes.section}>
     
      </div>
     
      
      <div className={classes.slideshow }>
     
      
      </div>
     <Prodottinew/>
    </div>




  );
}
export default Slide1;