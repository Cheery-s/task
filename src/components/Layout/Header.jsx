import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { FaBell, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./css/Layout.module.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user on component mount
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    fetchUser();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    // Clean up subscription
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed out successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred during sign out");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            AI Task Manager
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search tasks..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.headerActions}>
          <button className={styles.iconButton}>
            <FaBell />
            <span className={styles.notificationBadge}>3</span>
          </button>

          <div className={styles.userDropdown}>
            <button className={styles.userButton} onClick={toggleDropdown}>
              <div className={styles.userAvatar}>
                <FaUser />
              </div>
              <span className={styles.userName}>
                {user?.email?.split("@")[0] || "User"}
              </span>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/profile" className={styles.dropdownItem}>
                  <FaUser className={styles.dropdownIcon} />
                  <span>Profile</span>
                </Link>
                <Link to="/settings" className={styles.dropdownItem}>
                  <FaCog className={styles.dropdownIcon} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className={styles.dropdownItem}
                >
                  <FaSignOutAlt className={styles.dropdownIcon} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;