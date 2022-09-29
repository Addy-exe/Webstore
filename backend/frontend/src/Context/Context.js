import { createContext, useContext, useReducer , useEffect } from "react";

const CartItems = createContext()

// fetch cart from localstorage usign key cart
const cartFromlocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')

const productReducer = (state,action) => {
    switch(action.type){
        case 'SET_PRODUCTS':
            return{
                products: action.payload,
                cart: [...state.cart]
            }
        case 'ADD_TO_CART': 
            return { ...state , cart: [...state.cart,action.payload]};
        case 'REMOVE_FROM_CART':
            return { ...state , cart: state.cart.filter((c) => c._id !== action.payload._id)}
        case 'REMOVE_ALL':
            return { ...state , cart: []}
        default:
            return state
    }
}


const Context = ({children}) => {

    const [state, dispatch] = useReducer(productReducer,{
        products: null,
        cart: cartFromlocalStorage
    })
    // setting cart state from local storage
    useEffect(() => {
        // take key and sets data as string using stringify
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])
    
    return(
        <CartItems.Provider value={{...state,dispatch}}>
            {children}
        </CartItems.Provider>
    )
}

export default Context

export const CartState = () => {
    return useContext(CartItems)
}