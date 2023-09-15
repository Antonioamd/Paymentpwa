import React, { Fragment,useState, useEffect, useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FormattedMessage, useIntl } from 'react-intl';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/ShippingMethod/shippingMethod.gql';
import setShipping from './ShippingInformation1.gql';
import ShippingInformation from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import Button from '@magento/venia-ui/lib/components/Button';
import ShippingMethods from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments/ShippingMethods/shippingMethods';
import {useCartPage}  from '@magento/peregrine/lib/talons/CartPage/useCartPage';
import {
    CHECKOUT_STEP,
    useCheckoutPage
} from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import ScrollAnchor from '@magento/venia-ui/lib/components/ScrollAnchor/scrollAnchor';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.module.css';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import PaymentInformation from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentInformation';
import payments from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethodCollection';
import { useWindowSize, useToasts } from '@magento/peregrine';
import ShippingMethod from '@magento/venia-ui/lib/components/CheckoutPage/ShippingMethod';
const Shipping = () => {
    const talo23 =  useCartPage();

    const {
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        onAddToWishlistSuccess,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        wishlistSuccessProps
    } = talo23; 
    const {mutations} = setShipping;
    const    {setShippingMethodMutation1}=mutations;
    const talonProps = useCheckoutPage();
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, {});
    const [, { dispatch }] = useEventingContext();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const {
        /**
         * Enum, one of:
         * SHIPPING_ADDRESS, SHIPPING_METHOD, PAYMENT, REVIEW
         */
        activeContent,
        availablePaymentMethods,
        cartItems,
        checkoutStep,
        customer,
        error,
        guestSignInUsername,
        handlePlaceOrder,
        handlePlaceOrderEnterKeyPress,
        hasError,
        isCartEmpty,
        isGuestCheckout,
        isLoading,
        isUpdating,
        orderDetailsData,
        orderDetailsLoading,
        orderNumber,
        placeOrderLoading,
        placeOrderButtonClicked,
        setCheckoutStep,
        setGuestSignInUsername,
        setIsUpdating,
        setShippingInformationDone,
        scrollShippingInformationIntoView,
        setShippingMethodDone,
        scrollShippingMethodIntoView,
        setPaymentInformationDone,
        shippingInformationRef,
        shippingMethodRef,
        resetReviewOrderButtonClicked,
        handleReviewOrder,
        handleReviewOrderEnterKeyPress,
        reviewOrderButtonClicked,
        recaptchaWidgetProps,
        toggleAddressBookContent,
        toggleSignInContent
    } = talonProps;
    const [, { addToast }] = useToasts();
    const [prodotti,setProdotti]=useState(false);
    useEffect(() => {
        if(Array.isArray(cartItems)&& cartItems.length==0){
setProdotti(false);
        }
        else
        setProdotti(true);
        if (hasError) {
            const message =
                error && error.message
                    ? error.message
                    : formatMessage({
                          id: 'checkoutPage.errorSubmit',
                          defaultMessage:
                              'Oops! An error occurred while submitting. Please try again.'
                      });
            addToast({
                type: 'error',
                icon: errorIcon,
                message,
                dismissable: true,
                timeout: 7000
            });

            if (process.env.NODE_ENV !== 'production') {
                console.error(error);
            }
        }
    }, [addToast, error, formatMessage, hasError]);
    let checkoutContent;
    
    const operations = mergeOperations(DEFAULT_OPERATIONS, {});
    const {
        getSelectedAndAvailableShippingMethodsQuery,
        setShippingMethodMutation
    } = operations;
   
    const [{ cartId }] = useCartContext();
    const dispatchEvent = useCallback(
        shippingMethod => {
            dispatch({
                type: !isUpdateMode
                    ? 'CHECKOUT_SHIPPING_METHOD_ADDED'
                    : 'CHECKOUT_SHIPPING_METHOD_UPDATED',
                payload: {
                    cart_id: cartId,
                    selected_shipping_method: {
                        serializedValue: "flatrate"
                    }
                }
            });
        },
        [dispatch, cartId, isUpdateMode]
    );
    
    const paymentInformationSection =
     (
        <PaymentInformation
            onSave={setPaymentInformationDone}
            checkoutError={error}
            resetShouldSubmit={resetReviewOrderButtonClicked}
            setCheckoutStep={setCheckoutStep}
            shouldSubmit={reviewOrderButtonClicked}
        />
    ) ;
    const formErrors = [];
    const paymentMethods = Object.keys(payments);

    // If we have an implementation, or if this is a "zero" checkout,
    // we can allow checkout to proceed.
    let pluto =availablePaymentMethods;
    if (!pluto) {
      pluto =[{"code":"checkmo"}];
    }
    
    const isPaymentAvailable = 
    
    
    !!pluto.find(
        ({ code }) => code === 'free' || paymentMethods.includes(code)
    );
    
    if (!isPaymentAvailable) {
        formErrors.push(
            new Error(
                formatMessage({
                    id: 'checkoutPage.noPaymentAvailable',
                    defaultMessage: 'Payment is currently unavailable.'
                })
            )
        );
    }



    
    //const test232 = 
    const shippingMethodSection =
    checkoutStep >= CHECKOUT_STEP.SHIPPING_METHOD ? (
        <div>
            <ShippingMethod
                    pageIsUpdating={isUpdating}
                    onSave={setShippingMethodDone}
                    onSuccess={scrollShippingMethodIntoView}
                    setPageIsUpdating={setIsUpdating}
                />
            
        </div>
    ) : (
        <h3 className={classes.shipping_method_heading}>
                    <FormattedMessage
                        id={'checkoutPage.shippingMethodStep'}
                        defaultMessage={'2. Shipping Method'}
                    />
                </h3>
        
    );
const checkout = (<div>
   
   
<ScrollAnchor ref={shippingInformationRef}>
    <ShippingInformation
                     onSave={setShippingInformationDone}
                     onSuccess={scrollShippingInformationIntoView}
                     toggleActiveContent={toggleAddressBookContent}
                     toggleSignInContent={toggleSignInContent}
                     setGuestSignInUsername={setGuestSignInUsername}
                 />
</ScrollAnchor>


<ScrollAnchor ref={shippingMethodRef}>
{shippingMethodSection}
</ScrollAnchor>
            
           
            <div> 
         {paymentInformationSection}  
         </div>
 </div>

);

    return (
        <div>{checkout}</div>

    );

}
export default Shipping;