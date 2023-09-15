import { gql } from 'graphql-tag';

import { PriceSummaryFragment } from '@magento/peregrine/lib/talons//CartPage/PriceSummary/priceSummaryFragments.gql';
import { ShippingInformationFragment } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/shippingInformationFragments.gql';

import {
    AvailableShippingMethodsCheckoutFragment,
    SelectedShippingMethodCheckoutFragment
} from '@magento/peregrine/lib/talons/CheckoutPage/ShippingMethod/shippingMethodFragments.gql';

export const GET_SELECTED_AND_AVAILABLE_SHIPPING_METHODS = gql`
    query getSelectedAndAvailableShippingMethods($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...AvailableShippingMethodsCheckoutFragment
            ...SelectedShippingMethodCheckoutFragment
            # We include the following fragments to avoid extra requeries
            # after this mutation completes. This all comes down to not
            # having ids for shipping address objects. With ids we could
            # merge results.
            ...ShippingInformationFragment
        }
    }
    ${AvailableShippingMethodsCheckoutFragment}
    ${SelectedShippingMethodCheckoutFragment}
    ${ShippingInformationFragment}
`;

export const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod(
        $cartId: String!
        $shippingMethod: ShippingMethodInput!
    ) {
        setShippingMethodsOnCart(
            input: { cart_id: $cartId, shipping_methods: [$shippingMethod] }
        ) {
            cart {
                id
                # If this mutation causes "free" to become available we need to know.
                available_payment_methods {
                    code
                    title
                }
                ...SelectedShippingMethodCheckoutFragment
                ...PriceSummaryFragment
                # We include the following fragments to avoid extra requeries
                # after this mutation completes. This all comes down to not
                # having ids for shipping address objects. With ids we could
                # merge results.
                ...ShippingInformationFragment
                ...AvailableShippingMethodsCheckoutFragment
            }
        }
    }
    ${AvailableShippingMethodsCheckoutFragment}
    ${SelectedShippingMethodCheckoutFragment}
    ${PriceSummaryFragment}
    ${ShippingInformationFragment}
`;
export default {
    queries : {},
    mutations:{
    setShippingMethodMutation1: SET_SHIPPING_METHOD,
    }
};