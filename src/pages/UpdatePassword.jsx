import React, { useState } from 'react';
import { resetPassword } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Spinner from '../components/common/Spinner';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading } = useSelector((state) => state.auth);
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    // --- STYLED MAIN CONTAINER WITH AURORA BACKGROUND ---
    <div className='relative min-h-screen flex items-center justify-center px-4 bg-warm-stone text-soft-terracotta overflow-hidden'>
      {/* The Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>

      {loading ? (
        <Spinner />
      ) : (
        // --- STYLED GLASSMORPHISM CARD ---
        <div className='relative z-10 w-full max-w-md p-8 bg-espresso-brown/80 border border-soft-terracotta backdrop-blur-lg rounded-2xl shadow-lg'>
          
          <h1 className='text-3xl font-bold text-white'>Choose New Password</h1>
          <p className='mt-2 mb-6 text-base text-soft-terracotta/80'>Almost done. Enter your new password and you're all set.</p>

          <form onSubmit={handleOnSubmit} className='space-y-6'>
            {/* New Password Field */}
            <div className='relative'>
              <label className='block mb-1 text-sm font-medium text-soft-terracotta'>New Password<sup className="text-pink-400">*</sup></label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter new password'
                className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-[34px] cursor-pointer text-warm-stone hover:text-soft-terracotta'
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className='relative'>
              <label className='block mb-1 text-sm font-medium text-soft-terracotta'>Confirm Password<sup className="text-pink-400">*</sup></label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder='Re-enter new password'
                className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute right-3 top-[34px] cursor-pointer text-warm-stone hover:text-soft-terracotta'
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </span>
            </div>

            <button
              type='submit'
              className='w-full bg-burnt-sienna py-2 rounded-md font-semibold text-lg text-white transition-all duration-300 hover:bg-burnt-sienna/90 hover:-translate-y-1'
            >
              Reset Password
            </button>
          </form>

          <div className='mt-6 text-center'>
            <Link to='/login' className='text-sm text-soft-terracotta/80 hover:text-white hover:underline transition-colors duration-200'>
              &larr; Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;

//   return (
//     <div className='text-white flex items-center justify-center min-h-screen'>
//       {loading ? (
//         <div>LOADING...</div>
//       ) : (
//         <div className='bg-gray-800 p-8 rounded-lg w-full max-w-md'>
//           <h1 className='text-2xl font-bold mb-2'>Choose New Password</h1>
//           <p className='mb-6 text-sm'>Almost done. Enter your new password and you're all set.</p>

//           <form onSubmit={handleOnSubmit} className='space-y-6'>
//             <div className='relative'>
//               <label className='block mb-1'>New Password*</label>
//               <input
//                 required
//                 type={showPassword ? "text" : "password"}
//                 name='password'
//                 value={password}
//                 onChange={handleOnChange}
//                 placeholder='Enter new password'
//                 className='w-full p-3 text-black rounded'
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className='absolute right-3 top-9 cursor-pointer'
//               >
//                 {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//               </span>
//             </div>

//             <div className='relative'>
//               <label className='block mb-1'>Confirm Password*</label>
//               <input
//                 required
//                 type={showConfirmPassword ? "text" : "password"}
//                 name='confirmPassword'
//                 value={confirmPassword}
//                 onChange={handleOnChange}
//                 placeholder='Re-enter new password'
//                 className='w-full p-3 text-black rounded'
//               />
//               <span
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 className='absolute right-3 top-9 cursor-pointer'
//               >
//                 {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//               </span>
//             </div>

//             <button
//               type='submit'
//               className='w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400 transition'
//             >
//               Reset Password
//             </button>
//           </form>

//           <div className='mt-4 text-center'>
//             <Link to='/login' className='text-blue-400 underline'>
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdatePassword;
