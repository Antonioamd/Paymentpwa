/* src/components/GreetingPage/greetingPage.js */

import React from "react";
import { useParams } from "react-router-dom";
import Checkout from "@magento/venia-ui/lib/components/CheckoutPage";
import CartPage from "@magento/venia-ui/lib/components/CartPage";
import { useCartContext } from "@magento/peregrine/lib/context/cart";
import  Additemtocart  from "../Additemtocart";
const hi = {
  textAlign: "center",
  margin: "1rem",
};
const wave = {
  ...hi,
  fontSize: "5rem",
};

const GreetingPage = () => {
  const { who = "" } = useParams();
  
const [{cartId}]= useCartContext();
  return (
    <div>
      <h1 style={hi}>Hello, {who}!</h1>
      <h1 style={wave}>{"\uD83D\uDC4B"}</h1>
      <div>
        <h2 style={wave}>
        Simulazione  Processo di   Pagamento   
       </h2>
       
<Additemtocart/>
       
      </div>
    </div>
   
  );
};

export default GreetingPage;
