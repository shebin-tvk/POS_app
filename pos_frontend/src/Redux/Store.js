import {configureStore} from '@reduxjs/toolkit'
import customerSlice from './Slices/customerSlice'
import cartSlice from './Slices/cartSlice'
import userSlice from './Slices/userSlice'

const Store = configureStore({
    reducer: {
        customer : customerSlice,
        cart : cartSlice,
        user : userSlice 
    },

    devTools: import.meta.env.NODE_ENV !== 'production',

});

export default Store;