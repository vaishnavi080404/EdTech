import React from 'react';
import Template from '../components/core/Auth/Template';

function Login({ setIsLoggedIn }) {
  return (
    
    <div className="
      relative min-h-screen flex items-center justify-center px-4 
      bg-espresso-brown overflow-hidden
    ">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>


      <div className="relative z-10">
        <Template
          title="Welcome Back"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image="https://img.freepik.com/free-photo/portrait-young-happy-blogger-with-modern-laptop-outdoors_231208-2070.jpg?ga=GA1.1.689979136.1750934830&semt=ais_hybrid&w=740"
          formType="login"
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </div>
  );
}

export default Login;

