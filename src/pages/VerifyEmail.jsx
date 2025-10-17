import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;




    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp, // ✅ Pass OTP here
        navigate // ✅ Pass navigate here
      )
    );
  };

  const handleResendOtp = () => {
    if (signupData?.email) {
      dispatch(sendOtp(signupData.email, navigate));
    }
  };

 return (
    // --- STYLED MAIN CONTAINER WITH AURORA BACKGROUND ---
    <div className='relative min-h-screen flex items-center justify-center px-4 bg-espresso-brown text-soft-terracotta overflow-hidden'>
      {/* The Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>

      {loading ? (
        <Spinner />
      ) : (
        // --- STYLED GLASSMORPHISM CARD ---
        <div className='relative z-10 w-full max-w-md p-8 bg-soft-terracotta/10 border border-warm-stone/20 backdrop-blur-lg rounded-2xl shadow-2xl'>
          
          <h1 className="text-3xl font-bold text-white">Verify Email</h1>
          <p className="mt-2 mb-6 text-base text-soft-terracotta/80">
            A verification code has been sent to you. Enter the code below.
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              // --- STYLED OTP INPUTS ---
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] bg-mid-gray/50 rounded-lg text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              type="submit"
              className="w-full bg-burnt-sienna py-2 rounded-md font-semibold text-lg text-white transition-all duration-300 hover:bg-burnt-sienna/90 hover:-translate-y-1"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex justify-between items-center">
            <Link to="/login">
              <p className='text-sm text-soft-terracotta/80 hover:text-white hover:underline transition-colors duration-200'>&larr; Back to Login</p>
            </Link>
            <button
              onClick={handleResendOtp}
              className="text-sm text-rose-gold hover:text-burnt-sienna transition-colors duration-200"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;


//   return (
//     <div className="text-white p-6 max-w-md mx-auto">
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <h1 className="text-2xl font-bold mb-2">Verify Email</h1>
//           <p className="mb-4 text-sm text-gray-300">
//             A verification code has been sent to your email. Please enter the code below.
//           </p>

//           <form onSubmit={handleOnSubmit} className="space-y-4">
//             <OTPInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               renderInput={(props) => (
//                 <input
//                   {...props}
//                   className="w-10 h-10 mx-1 text-black text-center border border-gray-300 rounded"
//                 />
//               )}
//             />

//             <button
//               type="submit"
//               className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
//             >
//               Verify Email
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <Link to="/login" className="text-blue-400 hover:underline">
//               Back to Login
//             </Link>
//           </div>

//           <div className="mt-2 text-center">
//             <button
//               onClick={handleResendOtp}
//               className="text-sm text-gray-400 hover:text-white"
//             >
//               Resend OTP
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyEmail;
