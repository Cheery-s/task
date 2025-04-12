import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../commonComponents/Button";
import styles from "./css/ForgotPassword.module.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading,setLoading] =useState(false)
    const [submitted, setSubmitted] = useState(false);
    
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        // input validation
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }
        // Email format validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
          }
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/reset-password`,
            });

            if (error) {
                toast.error(error.message);
            } else {
                setSubmitted(true);
                toast.success("Password reset link sent to your email");
            }
        } catch (error) {
            toast.error("An error occurred while processing your request");
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className={styles.forgotPasswordContainer}>
            <ToastContainer position="top-right" autoClose = {3000}/>
            <div className={styles.card}>
                <div className={styles.header}>
                <h2 className={styles.title}>Forgot Password</h2>
                <p className={styles.subtitle}>
                     Enter your email address below to reset your password
                </p>
                </div>
                {!submitted ? (
          <form onSubmit={handleForgotPassword} className={styles.forgotPasswordForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={styles.input}
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={styles.primaryButton}
            >
              {loading ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <p>
              If an account exists with the email <strong>{email}</strong>, you
              will receive password reset instructions shortly.
            </p>
            <p>
              Please check your email and follow the instructions to reset your
              password.
            </p>
          </div>
        )}

<div className={styles.links}>
          <Link to="/login" className={styles.link}>
            Back to Login
          </Link>
        </div>
            </div>
        
        
        
        </div>
    );
};
export default ForgotPassword;