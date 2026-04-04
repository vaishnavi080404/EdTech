import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { FcGoogle } from "react-icons/fc";
import HighlightText from '../HomePage/HighlightText'; 
import { signInWithGooglePopup } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/operations/apiconnector'; 
import { setToken } from '../../../slices/authSlice'; 
import { setUser } from '../../../slices/ProfileSlice';
import {endpoints} from '../../../services/operations/apis';
import { useState } from 'react';
import { toast } from "react-hot-toast";

const Template = ({ title, desc1, desc2, image, formType,setIsLoggedIn }) => {
  // --- This state is crucial for the signup flow ---
  const [accountType, setAccountType] = useState("Student"); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await signInWithGooglePopup();
      
      
      const typeToSend = formType === 'signup' ? accountType : undefined;

      const response = await apiConnector(
        "POST",
        endpoints.VERIFY_GOOGLE_TOKEN_API,
        { 
          token: idToken,
          accountType: typeToSend,
          intent: formType 
        }
      );

      if (response.data.success) {
        const appToken = response.data.token;
        const userDetails = response.data.user;

        dispatch(setToken(appToken));
        dispatch(setUser(userDetails));
        localStorage.setItem("token", JSON.stringify(appToken));
        localStorage.setItem("user", JSON.stringify(userDetails));
        
        toast.success("Login Successful!");
        navigate("/dashboard/my-profile");
        
      } else {
        
        throw new Error(response.data.message || "Backend verification failed.");
      }

    } catch (error) {
      console.error("Google Sign-In Failed:", error);
      const errorMessage = error.response?.data?.message || "An unknown error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
   
    <div className="flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl px-4 py-10 gap-10 lg:gap-20">

        
        <div className="
          flex-1 p-10 rounded-2xl 
          bg-soft-terracotta/10 
          border border-warm-stone/20 
          backdrop-blur-lg 
          shadow-2xl
          mt-10
          mb-5
        ">
          <h1 className="text-4xl font-bold text-soft-terracotta">{title}</h1>
          <p className="mt-2 text-base text-soft-terracotta/80">
            <span>{desc1} </span>
            <br />
          
            <HighlightText text={desc2} />
          </p>

          <div className="mt-8">
            {formType === "signup" ? (
              <SignupForm setIsLoggedIn={setIsLoggedIn} accountType={accountType} setAccountType={setAccountType}/>
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-[1px] bg-warm-stone/50"></div>
            <p className="text-warm-stone text-sm font-medium">OR</p>
            <div className="flex-grow h-[1px] bg-warm-stone/50"></div>
          </div>

          <button 
          onClick={handleGoogleLogin}
          className="
            w-full flex items-center justify-center rounded-md font-medium 
            text-soft-terracotta bg-mid-gray/50 border border-warm-stone/50
            px-4 py-2 gap-3 transition-all duration-300
            hover:bg-warm-stone/50 hover:border-warm-stone
          ">
            <FcGoogle size={22} />
            <span>{formType === "signup" ? "Sign Up" : "Sign In"} with Google</span>
          </button>
        </div>

        
         <div className="relative w-11/12 max-w-[450px] hidden lg:block">
          {/* Background frame image with a branded color overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={"https://img.freepik.com/free-photo/grid-line-pattern-with-blue-texture-background_1409-1354.jpg?ga=GA1.1.689979136.1750934830&semt=ais_hybrid&w=740"}
              alt="Pattern"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-burnt-sienna/30"></div>
          </div>

         
          <img
            src={image}
            alt="student"
            className="
              absolute -top-6 -right-6 w-[95%] h-auto rounded-2xl
              border-4 border-soft-terracotta
              transition-all duration-300
              hover:scale-105 hover:-rotate-3
            "
          />
        </div>

      </div>
    </div>
  );
};

export default Template;


// import SignupForm from './SignupForm';
// import LoginForm from './LoginForm';
// import { FcGoogle } from "react-icons/fc";

// const Template = ({ title, desc1, desc2, image, formType, setIsLoggedIn }) => {
//   return (
//     <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
//       <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl px-4 py-10 gap-10 lg:gap-20">

//         {/* Left Form Section */}
//         <div className="flex-1 text-white">
//           <h1 className="text-3xl font-bold text-blue-400">{title}</h1>
//           <p className="mt-2 text-sm text-gray-300">
//             <span>{desc1} </span>
//             <span className="text-blue-200 italic">{desc2}</span>
//           </p>

//           <div className="mt-8">
//             {formType === "signup" ? (
//               <SignupForm setIsLoggedIn={setIsLoggedIn} />
//             ) : (
//               <LoginForm setIsLoggedIn={setIsLoggedIn} />
//             )}
//           </div>

//           {/* OR Divider */}
//           <div className="flex items-center gap-2 my-4">
//             <div className="flex-grow h-[1px] bg-gray-600"></div>
//             <p className="text-gray-400 text-sm font-medium">OR</p>
//             <div className="flex-grow h-[1px] bg-gray-600"></div>
//           </div>

//           {/* Google Button */}
//           <button className="w-full flex items-center justify-center rounded-md font-medium text-white border border-gray-600 px-4 py-2 gap-3 hover:bg-[#334155] transition">
//             <FcGoogle size={22} />
//             <span>{formType === "signup" ? "Sign Up" : "Sign In"} with Google</span>
//           </button>
//         </div>

//         {/* Right Image Section */}
//          <div className="relative w-11/12 max-w-[450px]">
//           <img
//             src={"https://img.freepik.com/free-photo/grid-line-pattern-with-blue-texture-background_1409-1354.jpg?ga=GA1.1.689979136.1750934830&semt=ais_hybrid&w=740"}
//             alt="Pattern"
            
//           />
//           <img
//             src={image}
//             alt="student"
//             className="absolute -top-10 right-4 "
//           />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Template;