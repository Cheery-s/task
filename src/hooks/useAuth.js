//src/hooks/useAuth.js => corrected
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../config/supabaseClient'
import { setUser, setLoading, setError, clearUser} from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export const useAuth = ()=>{
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state)=>state.auth)
    console.log("useAuth - user:", user);
    console.log("useAuth - loading:", loading);
    console.log("useAuth - error:", error);
useEffect(()=>{
  console.log('useAuth effect triggered'); // Debugging line
    // set loading state
    dispatch(setLoading(true));
    // Get current session and set up listener
 const getCurrentUser = async()=>{
    try{
      console.log("Checking current user...");

        const { data: {session},error } = await supabase.auth.getSession();
        if (error) throw error;
    if (session?.user) {
      console.log("Current user:", session.user);
      dispatch(setUser(session.user));
    } else {
      console.log("No active session found");
      dispatch(clearUser());
    }
        
    }catch(error){
      console.error("Auth error:", error);
        dispatch(setError(error.message || "An unknown error occurred"));
    }finally{
      console.log("Setting loading to false");
        dispatch(setLoading(false));
    }
};

//Set up auth state listener
const {data: authListener} = supabase.auth.onAuthStateChange((event, session)=>{
    if (event === 'SIGNED_IN' && session?.user){
      console.log("User signed in:", session.user);
        dispatch(setUser(session.user));
    }else if(event === 'SIGNED_OUT'){
        dispatch(clearUser());
    }
});
//call getCurrentUser initially to get the current user
getCurrentUser();
//cleanup the listener when component unmounts
return ()=>{
    // if (authListener && authListener?.subscription) {
      if ( authListener?.subscription){
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
      toast.success("Login successful");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Login failed");
      dispatch(setError(error.message || "An unknown error occurred"));
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
      toast.success("Signup successful");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Signup failed");
      dispatch(setError(error.message || "An unknown error occurred"));
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
      toast.success("Logout successful");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Logout failed");
      dispatch(setError(error.message || "An unknown error occurred"));
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { user, loading, error, login, signup, logout };
};
  