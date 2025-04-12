// path: src/components/Auth/login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import Button from "../commonComponents/Button";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./css/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //  input validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    //REGEX xpreSSION
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // start loading
    setLoading(true); // start loading

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false); //stop loading
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
      toast.error("An error occured during Google login");
    } finally {
      setLoading(false);
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
      toast.error("An error occured during GitHub login");
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordContainer}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className={styles.input}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <Link to="/forgot-password" className={styles.forgotPasswordLink}>
              Forgot your password?
            </Link>
          </div>
          <div className={styles.signInContainer}>
          <Button
            type="submit"
            disabled={loading}
            className={styles.primaryButton}
          >
            {loading ? "Logging in ..." : "Sign In"}
          </Button>
          </div>    
          <div className={styles.divider}>
            <span className={styles.dividerText}>Or continue with</span>
          </div>

          <div className={styles.socialButtons}>
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className={styles.socialButton}
            >
              <FaGoogle className={styles.socialIcon} /> Login with Google
            </Button>
            <Button
              onClick={handleGitHubLogin}
              disabled={loading}
              className={styles.socialButton}
            >
              <FaGithub className={styles.socialIcon} /> Login with GitHub
            </Button>
          </div>
        </form>

        <div>
          <p className={styles.signupText}>
            {" "}
            Don't have an account? {" "}
            <Link to="/signup" className={styles.signupLink}>
              SignUp now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
