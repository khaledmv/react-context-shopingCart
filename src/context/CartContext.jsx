import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

// define initial state
const initialState = {
    cartList: [],
    total: 0
}

// create context
const CartContext = createContext(initialState);



// create cart provider
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        const updateCartList = state.cartList.concat(product);
        updateTotal(updateCartList);
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updateCartList
            }
        })

    }

    const removeFromCart = (product) => {
        const updateCartList = state.cartList.filter(current => current.id !== product.id);
        updateTotal(updateCartList);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updateCartList
            }
        })
    }

    const updateTotal = (products) => {
        let total = 0;
        products.forEach(product => total = total + product.price);

        dispatch({
            type: "UPDATE_TOTAL",
            payload: {
                total: total
            }
        })
    }


    const value = {
        total: state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart
    };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );

}

// define useCart for using in dom

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}