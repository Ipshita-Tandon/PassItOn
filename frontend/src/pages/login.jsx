import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { signInWithEmail } from '../supabase/supabaseAuth'; // Supabase auth
import { toast } from 'react-hot-toast';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoggingIn(true);
        const { error } = await signInWithEmail(formData.email, formData.password);
        if (error) throw error;

        toast.success("Logged in successfully!");
        navigate('/homepage');
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.message || "Failed to login. Please try again.");
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <div className="login-container">
      {/* Gradient Overlay */}
      <div className="gradient-overlay">
        <div className="gradient-1"></div>
        <div className="radial-gradient-1"></div>
        <div className="radial-gradient-2"></div>
      </div>

      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="form-input"
            />
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="form-options">
            <label className="remember-label">
              <input
                type="checkbox"
                className="remember-checkbox"
              />
              <span>Remember me</span>
            </label>
            <a
              href="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="submit-button"
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="signup-link-container">
          <p className="signup-text">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="signup-link"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
