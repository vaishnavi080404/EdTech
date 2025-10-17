

import React from 'react';
import Template from '../components/core/Auth/Template';

function Login({ setIsLoggedIn }) {
  return (
    // --- STYLING APPLIED HERE ---
    // Replaced the generic background with our branded, animated "Aurora" background.
    // This creates a cohesive and premium feel that matches the homepage.
    <div className="
      relative min-h-screen flex items-center justify-center px-4 
      bg-espresso-brown overflow-hidden
    ">
      {/* The Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/20 to-transparent animate-aurora z-0"></div>

      {/* The Template component now sits on top of the new background */}
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


// import React from 'react';
// import Template from '../components/core/Auth/Template';

// function Login({ setIsLoggedIn }) {
//   return (
//     <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
//       <Template
//         title="Welcome Back"
//         desc1="Build skills for today, tomorrow, and beyond."
//         desc2="Education to future-proof your career."
//         image="https://img.freepik.com/free-photo/portrait-young-happy-blogger-with-modern-laptop-outdoors_231208-2070.jpg?ga=GA1.1.689979136.1750934830&semt=ais_hybrid&w=740"
//         formType="login"
//         setIsLoggedIn={setIsLoggedIn}
//       />
//     </div>
//   );
// }

// export default Login;