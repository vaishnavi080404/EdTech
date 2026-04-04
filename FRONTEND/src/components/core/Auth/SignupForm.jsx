import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../slices/authSlice';

const SignupForm = ({ setIsLoggedIn,accountType, setAccountType  }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //const [accountType, setAccountType] = useState("Student");

  const navigate = useNavigate();
  const dispatch = useDispatch();

function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

      const completeSignupData = {
    ...formData,
    accountType,
  };

  
  dispatch(setSignupData(completeSignupData));


   
    localStorage.setItem("signupData", JSON.stringify({
      ...formData,
      accountType,
    }));


    dispatch(sendOtp(formData.email, navigate));
  }

  return (
    <div>
     
      <div className="flex bg-mid-gray/50 p-1 gap-x-1 rounded-full max-w-max mb-6 border border-warm-stone/50">
        <button
          onClick={() => setAccountType("Student")}
          className={`
            ${accountType === "Student"
              ? "bg-warm-stone text-white"
              : "bg-transparent text-soft-terracotta"
            } py-2 px-5 rounded-full transition-all duration-200
          `}
        >
          Student
        </button>
        <button
          onClick={() => setAccountType("Instructor")}
          className={`
            ${accountType === "Instructor"
              ? "bg-warm-stone text-white"
              : "bg-transparent text-soft-terracotta"
            } py-2 px-5 rounded-full transition-all duration-200
          `}
        >
          Instructor
        </button>
      </div>

      <form
        onSubmit={submitHandler}
        className="w-full space-y-6"
      >
        {/* First & Last Name */}
        <div className="flex gap-4">
          <label className="w-1/2">
            <p className="mb-1 text-sm font-medium text-soft-terracotta">First Name<sup className="text-pink-500">*</sup></p>
            <input
              type="text"
              required
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter first name"
              value={formData.firstName}
              className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
            />
          </label>

          <label className="w-1/2">
            <p className="mb-1 text-sm font-medium text-soft-terracotta">Last Name<sup className="text-pink-500">*</sup></p>
            <input
              type="text"
              required
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter last name"
              value={formData.lastName}
              className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
            />
          </label>
        </div>

        
        <label className="block">
          <p className="mb-1 text-sm font-medium text-soft-terracotta">Email Address<sup className="text-pink-500">*</sup></p>
          <input
            type="email"
            required
            name="email"
            onChange={changeHandler}
            placeholder="Enter email id"
            value={formData.email}
            className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
          />
        </label>

        
        <div className="flex gap-4">
          <label className="w-1/2 relative">
            <p className="mb-1 text-sm font-medium text-soft-terracotta">Create Password<sup className="text-pink-500">*</sup></p>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              name="password"
              onChange={changeHandler}
              placeholder="Password"
              value={formData.password}
              className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[34px] right-3 text-warm-stone cursor-pointer hover:text-soft-terracotta"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </label>

          <label className="w-1/2 relative">
            <p className="mb-1 text-sm font-medium text-soft-terracotta">Confirm Password<sup className="text-pink-500">*</sup></p>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-[34px] right-3 text-warm-stone cursor-pointer hover:text-soft-terracotta"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-burnt-sienna py-2 rounded-md font-semibold text-lg text-white transition-all duration-300 hover:bg-burnt-sienna/90 hover:-translate-y-1"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

