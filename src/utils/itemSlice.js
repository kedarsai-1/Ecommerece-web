import { createSlice } from "@reduxjs/toolkit";
const itemSlice = createSlice ({
    name:"item",
    initialState:null,
    reducers:{
        additems:(state,action)=>{
            return action.payload;
        }

    }

})
export const {additems}=itemSlice.actions;
export default itemSlice.reducer