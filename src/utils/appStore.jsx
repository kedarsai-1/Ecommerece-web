import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./userSlice"
import itemReducer from "./itemSlice"
const appStore =  configureStore({
    reducer:{
        user:userReducer,
        bag:itemReducer

    }

})
export default appStore