import React from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../../config/supabaseClient";
import Header from "./Header";
import Sidebar from "./SideBar";
import styles from "./css/Layout.module.css";


const MainLayout = ({children}) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if user is authenticated
  //   const checkUser = async () => {
  //     const { data } = await supabase.auth.getUser();
  //     if (!data?.user) {
  //       // Redirect to login if not authenticated
  //       navigate("/login");
  //     }
  //   };

  //   checkUser();
  // }, [navigate]);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>
          {children} {/* Render the child components here */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;