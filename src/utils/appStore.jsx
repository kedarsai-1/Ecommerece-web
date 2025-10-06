import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./userSlice"
import itemReducer from "./itemSlice"
import {loadState,saveState} from "./localStorage"
const preloadedState = loadState();
const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
      const result = next(action);
      saveState(getState().bag.items); 
      return result;
    };
  };

const appStore =  configureStore({

    reducer:{
        user:userReducer,
        bag:itemReducer

    },
    preloadedState:{
        bag:{
            items:preloadedState||[]
        }
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(localStorageMiddleware)

})

export default appStore
