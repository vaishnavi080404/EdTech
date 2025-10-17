import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { VscSignOut, VscDashboard } from "react-icons/vsc";


const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstName = user?.firstName || "U";
  const lastName = user?.lastName || "S";

  const handleLogout = () => {
    dispatch(logout(navigate));
  };


  return (
    <div className="relative group">
      {/* --- STYLED USER AVATAR --- */}
      <div className="flex items-center h-10 w-10 cursor-pointer">
        <img
          src={user?.image}
          alt={`Profile of ${user?.firstName}`}
          className="w-full h-full rounded-full object-cover border-2 border-warm-stone/50 group-hover:border-burnt-sienna transition-all duration-200"
        />
      </div>

      {/* --- STYLED DROPDOWN MENU --- */}
      <div className="
        absolute right-0 top-full mt-2 w-48 rounded-lg shadow-2xl z-50
        bg-soft-terracotta/80 backdrop-blur-lg border border-warm-stone/20
        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
        transition-all duration-300 ease-in-out
        transform-gpu group-hover:scale-100 scale-95
      ">
        <ul className="py-2 text-sm text-espresso-brown font-semibold">
          <li
            onClick={() => navigate("/dashboard/my-profile")} // Direct link to my-profile
            className="flex items-center gap-3 px-4 py-2 hover:bg-warm-stone/20 cursor-pointer transition-colors duration-200"
          >
            <VscDashboard /> Dashboard
          </li>
          <li
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 hover:bg-warm-stone/20 cursor-pointer transition-colors duration-200 text-red-700"
          >
            <VscSignOut /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;


//   return (
//     <div className="relative group">
//       <div className="rounded-full border border-richblack-700">
//         <img
//           src={user?.image}
//           alt="User Initials"
//           className="w-10 h-10 rounded-full object-cover cursor-pointer"
//         />
//       </div>

//       {/* Dropdown on hover */}
//      <div className="absolute right-0 top-12 w-44 rounded-md shadow-lg bg-white z-50 border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ease-in-out">
//         <ul className="py-2 text-sm text-gray-700">
//           <li
//             onClick={() => navigate("/dashboard")}
//             className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             <AiOutlineDashboard /> Dashboard
//           </li>
//           <li
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             <VscSignOut /> Logout
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileDropdown;

