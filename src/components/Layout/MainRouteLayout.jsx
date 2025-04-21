import React from "react";
import {Outlet} from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./SideBar";
import styles from "./css/Layout.module.css";


const MainRouteLayout = () => {
  
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet /> {/* Render the child components here */}
        </main>
      </div>
    </div>
  );
};

export default MainRouteLayout;