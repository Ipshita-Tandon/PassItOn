import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import './signUp.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if(!formData.firstName.trim()) {
      toast.error("First Name is required");
      return false;
    }
    if(!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if(!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if(formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      try {
        setIsSigningUp(true);
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        const user = userCredential.user;
        
        // Add display name to the user profile
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`
        });
        
        // Store additional user data in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          photo: ""
        });

        console.log("User Registered Successfully");
        // console.log(user);
        
        toast.success("Account created successfully!", {
            position: "top-center",
        });
        
      } catch (error) {
        console.error("Signup error:", error);
        if (error.code === "auth/email-already-in-use") {
            toast.error("This email is already registered. Please log in or use another email.", {
                position: "bottom-center", 
            });
        } else {
            toast.error(error.message || "Failed to create account. Please try again.", {
                position: "bottom-center",
            });
        }
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="gradient-overlay">
        <div className="gradient-1"></div>
        <div className="radial-gradient-1"></div>
        <div className="radial-gradient-2"></div>
      </div>

      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="form-input"
              required
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
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit" 
            disabled={isSigningUp}
            className="submit-button"
          >
            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="login-link-container">
          <p className="login-text">
            Already have an account?{' '}
            <a href="/login" className="login-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;