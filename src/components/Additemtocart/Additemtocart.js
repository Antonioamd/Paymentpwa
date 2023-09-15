import React ,{Fragment,useMemo,useState,useRef, useEffect} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';
import { useWishlistItems } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistItems';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Image from '@magento/venia-ui/lib/components/Image';
import Price from '@magento/venia-ui/lib/components/Price';
import Options from '@magento/venia-ui/lib/components/ProductOptions';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { Spinner } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useCartContext } from "@magento/peregrine/lib/context/cart";
import WishlistItem from '@magento/venia-ui/lib/components/WishlistPage/wishlistItem';
import AddToCartDialog from '@magento/venia-ui/lib/components/AddToCartDialog';
import {useCartPage} from '@magento/peregrine/lib/talons/CartPage/useCartPage';
import ProductListing from '@magento/venia-ui/lib/components/CartPage/ProductListing';
import pluto from './Additemtocart';
import Shipping from '../Shipping';
const Additemtocart = () =>
 {
  const taloncart= useCartPage();
  const {
    cartItems,
    hasItems,
    isCartUpdating,
    fetchCartDetails,
    onAddToWishlistSuccess,
    setIsCartUpdating,
    shouldShowLoadingIndicator,
    wishlistSuccessProps

  } = taloncart;
  const hi = {
    textAlign: "center",
    margin: "1rem",
  };
  const wave = {
    ...hi,
    fontSize: "2rem",
  };
  
  const prodottostring = cartItems[0];
  const classes = useStyle(pluto);
  const talonProps = useWishlistItems();
  const {
      activeAddToCartItem,
      handleCloseAddToCartDialog,
      handleOpenAddToCartDialog
  } = talonProps;
const riferimento = useRef(activeAddToCartItem);

  const [elementoaggiunto,setElementoaggiunto] = useState("");
  const { items, wishlistId } = {"items":[{"id":"1","product":{"uid":"MTI=","image":{"label":"Silver Amor Bangle Set","url":"https://ec2-52-45-29-175.compute-1.amazonaws.com/media/catalog/product/cache/f14a6186c9e5a7094c97869bf900d927/v/a/va22-si_main.jpg","__typename":"ProductImage"},"name":"Silver Amor Bangle Set","price_range":{"maximum_price":{"final_price":{"currency":"USD","value":98,"__typename":"Money"},"discount":{"amount_off":0,"__typename":"ProductDiscount"},"__typename":"ProductPrice"},"__typename":"PriceRange"},"sku":"VA22-SI-NA","stock_status":"IN_STOCK","__typename":"SimpleProduct"},"__typename":"SimpleWishlistItem"}] ,"wishlistId":"1"};
 /*
  const itemElements = useMemo(() => {
    return items.map(item => {
        return (
            <WishlistItem
                key={item.id}
                item={item}
                onOpenAddToCartDialog={handleOpenAddToCartDialog}
                wishlistId={wishlistId}
            />
        );
    });
}, [handleOpenAddToCartDialog, items, wishlistId]);


*/

useEffect(() => {


  setElementoaggiunto(JSON.stringify(activeAddToCartItem,null,2));

},[activeAddToCartItem]);

const productListing = hasItems ? (

<div>
  <ProductListing
      onAddToWishlistSuccess={onAddToWishlistSuccess}
      setIsCartUpdating={setIsCartUpdating}
      fetchCartDetails={fetchCartDetails}
  />
 
<h1 style={wave}>Checkout</h1>
<Shipping/>
</div>


) : (
  <div>
  <h3>
      <FormattedMessage
          id={'cartPage.emptyCart'}
          defaultMessage={'Inserisci il prodotto nel carrello.'}
      />
       </h3>
    <h1 style={wave}>Inserisci il prodotto nel Carrello</h1>  
    </div> 
);
      const [{cartId}]= useCartContext();
      
  
     
         

    return (
      <div class="flex flex-row">
        
           <div class=" shrink w-100">
             <div class="main-page-Yr- max-w-site mx-auto my-0">
               <div class="wishlistPage-root-YPP gap-y-xs grid pl-sm pr-sm py-md lg_gap-y-md lg_px-lg">
    
                <div class="wishlistItems-root-6lz gap-x-xs gap-y-md grid xs_gap-x-md xs_gap-y-md">
                   <div class="image-root-ZSi image-container-dLP relative">
                        <div class="wishlistItem-root-AA0 content-start grid gap-y-2xs">
                         <WishlistItem
                              key="1"
                              item={items[0]}
                              onOpenAddToCartDialog={handleOpenAddToCartDialog}
                                wishlistId={wishlistId}
                           />
           
           
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
               </div>
          
             
           <div class="background-color: bg-yellow-50" >
                 <h2 style={wave}>
                   Cart
                  </h2>
              <div>
               {productListing}
               </div>
              <div>
                <h2 style={wave}>
                 
                 
                </h2>
             
              </div> 
            </div> 
             
          <div class="shrink w-200 background-color: bg-gray-200">
          <h2 style={wave}>
                   Gateway Pagamento in attesa
                  </h2>
            </div>  
            
     </div>

       );
};

export default Additemtocart;


