import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from '../services/operations/authAPI'
import { IoMailOpenOutline } from "react-icons/io5"

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");

    const {loading} =useSelector ((state)=>state.auth)
    const dispatch =useDispatch();


    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }




 return (
    // --- STYLED MAIN CONTAINER WITH AURORA BACKGROUND ---
    <div className='relative min-h-screen flex items-center justify-center px-4 bg-warm-stone text-soft-terracotta overflow-hidden'>
      {/* The Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>

      {loading ? (
       <div>Loading</div>
      ) : (
        // --- STYLED GLASSMORPHISM CARD ---
        <div className='relative z-10 w-full max-w-md p-8 bg-espresso-brown/80 border border-soft-terracotta backdrop-blur-lg rounded-2xl shadow-2xl'>
          
          <h1 className='text-3xl font-bold text-white'>
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>

          <p className='mt-2 mb-6 text-base text-soft-terracotta/80'>
            {!emailSent 
              ? "Have no fear. We will email you instructions to reset your password. If you don't have access to your email, we can try account recovery." 
              : `We have sent the password reset link to ${email}`
            }
          </p>

          <form onSubmit={handleOnSubmit} className='space-y-6'>
            {!emailSent ? (
              // --- INITIAL VIEW: EMAIL INPUT ---
              <div>
                <label className="block">
                  <p className="mb-1 text-sm font-medium text-soft-terracotta">Email Address<sup className="text-pink-400">*</sup></p>
                  <input
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Your Email Address'
                    className="w-full px-4 py-2 rounded-md bg-mid-gray/50 text-soft-terracotta border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
                  />
                </label>
              </div>
            ) : (
              // --- SUCCESS VIEW: ICON ---
              <div className="flex justify-center">
                <div className="p-4 bg-rich-teal/20 rounded-full">
                  <IoMailOpenOutline className="text-rich-teal text-5xl" />
                </div>
              </div>
            )}

            <button
              type='submit'
              className='w-full bg-burnt-sienna py-2 rounded-md font-semibold text-lg text-white transition-all duration-300 hover:bg-burnt-sienna/90 hover:-translate-y-1'
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <Link to="/login">
              <p className='text-sm text-soft-terracotta/80 hover:text-white hover:underline transition-colors duration-200'>&larr; Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;


//   return (
//     <div className='text-white flex justify-center items-center '>
//       {
//         loading ?(<div>Loading...</div>)
//          :
//          ( <div>
//             <h1>
//                 {
//                     !emailSent ? "Reset Your Password" : "Check Your Email"
//                 }
//             </h1>

//             <p>
//                 {
//                    !emailSent ? "Have no  fear. We will email you instructions to reset your password.If you dont have access to your email we can try account recovery" 
//                    : `We have sent the reset email to ${email}`
//                 }
//             </p>

//             <form onSubmit={handleOnSumbit}>
//                 {
//                     !emailSent && (
//                         <label>
//                             <p>Email Address*</p>
//                             <input
//                             required
//                             type='email'
//                             name='email'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder='Enter Your Email Address'
//                             />
//                         </label>
//                     )
//                 }

//                 <button type='submit'>
//                     {
//                         !emailSent ? "Reset Password" : "Resend Email"
//                     }
//                 </button>
//             </form>

//             <div>
//                 <Link to="/login">
//                 <p>Back to Login</p>
//                 </Link>
//             </div>

//          </div>)
//       }
//     </div>
//   )
// }

// export default ForgotPassword
