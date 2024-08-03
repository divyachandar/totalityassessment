import { faker } from '@faker-js/faker';
import { createContext, useContext, useReducer } from 'react';
import { cartReducer,productReducer } from "./Reducers"; 

const Context = createContext();
faker.seed(99);

const CartContext = ({ children }) => {
    const property = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        buildingNumber: faker.location.buildingNumber(),
        city: faker.location.city(),
        state: faker.location.state(),
        price: faker.commerce.price(),
        image:faker.image.url(),
        availableEMI: faker.datatype.boolean(),
        ratings: faker.number.int({ min: 1, max: 5 }),
      
    }));
   
    const [state, dispatch] = useReducer(cartReducer, {
        property: property,
        cart: []
    });
    
      const [productState, productDispatch] = useReducer(productReducer, {
    byavailableEMI: false,
    byRating: 0,
    searchQuery: "",
      });
    

    return(<Context.Provider value={{state,dispatch,productState, productDispatch}}>
        {children}
    </Context.Provider>);
};



export const CartState = () => {
    return useContext(Context);
};

export default CartContext;
