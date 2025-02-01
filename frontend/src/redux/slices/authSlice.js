import {createSlice} from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        isDoctor: false,  // Ensure default value
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token; // Store the token
          },
          login(state, action) {
            console.log("Reducer Payload:", action.payload);  
        
            state.user = {
                _id: action.payload._id || null,
                email: action.payload.email || "",
                firstName: action.payload.firstName || "",
                lastName: action.payload.lastName || "",
                phone: action.payload.phone || "",
                isDoctor: action.payload.isDoctor ?? false, // Ensures boolean
            };
        
            state.token = action.payload.token || null;
            state.isDoctor = action.payload.isDoctor ?? false; // Directly setting isDoctor
            state.loading = false;
        }
        
        
        ,
        register(state, action) {
            const user = action.payload?.user || {};  // Fallback to empty object
            state.user = user;
            state.token = action.payload.token;
            state.isDoctor = user.isDoctor ?? false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isDoctor = false; // Reset to default value
            state.loading = false;
        },
        update(state, action) {
            state.user = action.payload;
            state.token = action.payload.token;
            state.isDoctor = action.payload?.isDoctor || false; // Update isDoctor
        },
    },
});

export const {login,logout,register,update,setToken} = authSlice.actions;
export default authSlice.reducer;