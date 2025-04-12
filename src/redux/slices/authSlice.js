//src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{
        setUser(state,action){
            state.user = action.payload;
            state.loading =false;
        },
        setLoading(state,action){
            state.loading = action.payload;

        },
        setError(state,action){
            state.error = action.payload;
            state.loading =false;
        },
        clearUser(state){
            state.user =null;
        }

    }
});
export const { setUser,setLoading, setError, clearUser} = authSlice.actions
export default authSlice.reducer;