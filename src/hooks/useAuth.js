//src/hooks/useAuth.js => corrected
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../config/supabaseClient'
import { setUser, setLoading, setError, clearUser} from '../redux/slices/authSlice';

export const useAuth = ()=>{
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state)=>state.auth)

useEffect(()=>{
    // set loading state
    dispatch(setLoading(true));
    // Get current session and set up listener
 const getCurrentUser = async()=>{
    try{
        const { data: {user} } = await supabase.auth.getUser();
        dispatch(setUser(user));
    }catch(error){
        dispatch(setError(error));
    }finally{
        dispatch(setLoading(false));
    }
};

//Set up auth state listener
const {data: authListener} = supabase.auth.onAuthStateChange((event, session)=>{
    if (event === 'SIGNED_IN'){
        dispatch(setUser(session.user));
    }else if(event === 'SIGNED_OUT'){
        dispatch(clearUser());
    }
});
//call getCurrentUser initially to get the current user
getCurrentUser();
//cleanup the listener when component unmounts
return ()=>{
    if (authListener && authListener.subscription) {
    authListener.subscription.unsubscribe();
}
};
},[dispatch]);

// Login method
const login = async (email, password) => {
    dispatch(setLoading(true));
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Signup method
  const signup = async (email, password) => {
    dispatch(setLoading(true));
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Logout method
  const logout = async () => {
    dispatch(setLoading(true));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(clearUser());
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { user, loading, error, login, signup, logout };
};
  