// path: src/components/Auth/signup.jsx

import React, { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../commonComponents/Button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import styles from "./css/Signup.module.css";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // 1. input validation
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } // Validation passed
    setLoading(true); // start loading
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(error.message, { position: "top-center" });
      } else {
        toast.success("Check your Email to check for confirmation link", {
          position: "top-center",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An Error occured during signup");
    } finally {
      setLoading(false); //stop Loading
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error("An Error occured during Google signup");
    } finally {
      setLoading(false); //stop Loading
    }
  };

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error("An Error occured during Github signup");
    } finally {
      setLoading(false); //stop Loading
    }
  };
  return (
    <div className={styles.signupContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create an account</h2>
          <p className={styles.subtitle}>Sign up to get started</p>
        </div>

        <form onSubmit={handleSignup} className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label htmlFor="signup-email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={styles.input}
              autoComplete="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="signup-password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              value={password}
              placeholder="********"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="********"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.signInContainer}>
          <Button
            type="submit"
            disabled={loading}
            className={styles.primaryButton}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button></div>
          <div className={styles.divider}>
            <span className={styles.dividerText}>Or continue with</span>
          </div>

          <div className={styles.socialButtons}>
            <Button
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading}
              className={styles.socialButton}
            >
              <FaGoogle /> Login with Google
            </Button>

            <Button
              type="button"
              disabled={loading}
              onClick={handleGitHubLogin}
              className={styles.socialButton}
            >
              <FaGithub className={styles.socialIcon} /> Login with GitHub
            </Button>
          </div>
        </form>
        <div className={styles.loginText}>
          Already have an account? {""}
          <Link to="/login" className={styles.loginLink}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
