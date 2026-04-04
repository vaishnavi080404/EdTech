

import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  return (

    <form
      onSubmit={submitHandler}
      className="w-full max-w-md space-y-6"
    >
    
      <label className="block">
        <p className="mb-1 text-sm font-medium text-soft-terracotta">Email Address<sup className="text-pink-500">*</sup></p>
        <input
          type="email"
          required
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter your email"
          name="email"
          
          className="
            w-full px-4 py-2 rounded-md 
            bg-mid-gray/50 text-soft-terracotta 
            border border-warm-stone/50 
            focus:outline-none focus:ring-2 focus:ring-burnt-sienna
            placeholder:text-warm-stone
          "
        />
      </label>

     
      <label className="block relative">
        <p className="mb-1 text-sm font-medium text-soft-terracotta">Password<sup className="text-pink-500">*</sup></p>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter your password"
          name="password"
        
          className="
            w-full px-4 py-2 rounded-md 
            bg-mid-gray/50 text-soft-terracotta 
            border border-warm-stone/50 
            focus:outline-none focus:ring-2 focus:ring-burnt-sienna
            placeholder:text-warm-stone
          "
        />
        <span
          className="absolute right-3 top-[34px] cursor-pointer text-warm-stone hover:text-soft-terracotta"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
        </span>
        <Link to="/forgot-password" className="text-rose-gold text-xs hover:underline mt-1 inline-block">
          Forgot Password?
        </Link>
      </label>

      <button
        type="submit"
      
        className="
          w-full bg-burnt-sienna py-2 rounded-md 
          font-semibold text-lg text-white
          transition-all duration-300
          hover:bg-burnt-sienna/90 hover:-translate-y-1
        "
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;


