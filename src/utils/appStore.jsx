import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./userSlice"
import itemReducer from "./itemSlice"
const appStore =  configureStore({
    reducer:{
        user:userReducer,
        item:itemReducer

    }

})
export default appStore