//src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:true,
        error:null,
    },
    reducers:{
        setUser(state,action){
            state.user = action.payload;
            state.loading = false;
            state.error = null;
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
            state.loading = false;
            state.error = null;
        }

    }
});
export const { setUser,setLoading, setError, clearUser} = authSlice.actions
export default authSlice.reducer;