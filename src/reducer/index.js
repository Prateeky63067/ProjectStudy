import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profleReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profleReducer,
    cart:cartReducer
})

export default rootReducer
