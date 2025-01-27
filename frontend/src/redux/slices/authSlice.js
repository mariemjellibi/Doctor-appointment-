import {createSlice} from "@reduxjs/toolkit";
const authSlice = createSlice({
    
    name: "auth",
    initialState: {
        user:null,
        token: null,
        loading: false,
    },
    reducers: {
        login(state,action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;  
        },
        register(state, action) {
            state.user = action.payload; // Save user data on registration
            state.isAuthenticated = true;
          },
        logout(state) {
            state.user = null;
            state.token = null;
            state.loading = false;  
        },
    },
});
export const {login,logout,register} = authSlice.actions;
export default authSlice.reducer;