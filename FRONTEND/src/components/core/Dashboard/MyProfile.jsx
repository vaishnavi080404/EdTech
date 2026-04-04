import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { VscEdit } from 'react-icons/vsc';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    // --- STYLED MAIN CONTAINER ---
    // Removed fixed height and overflow, using padding for spacing.
    <div className="w-full max-w-4xl mx-auto text-soft-terracotta py-10 px-4">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>

      {/* --- STYLED PROFILE CARD --- */}
      <div className="bg-warm-stone/10 border border-soft-terracotta/20 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-espresso-brown/70">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onClick={() => navigate("/dashboard/settings")} 
        >         
          <VscEdit />
        </IconBtn>
      </div>

      {/* --- STYLED ABOUT SECTION --- */}
      <div className="bg-warm-stone/10 border border-warm-stone/20 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-start justify-between gap-4 shadow-md">
        <div className="w-full">
          <p className="text-lg font-semibold mb-2">About</p>
          <p className="text-espresso-brown/80 text-sm leading-relaxed">
            {user?.additionalDetails?.about ?? "Write something about yourself"}
          </p>
        </div>
        <IconBtn
          text="Edit"
          onClick={() => navigate("/dashboard/settings")}
        >
          <VscEdit />
        </IconBtn>
      </div>

      {/* --- STYLED PERSONAL DETAILS --- */}
      <div className="bg-warm-stone/10 border border-warm-stone/20 rounded-lg p-6 space-y-6 shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <VscEdit />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-sm">
          <div>
            <p className="text-soft-terracotta mb-1">First Name</p>
            <p className="font-medium text-espresso-brown/80">{user?.firstName}</p>
          </div>
          <div>
            <p className="text-soft-terracotta mb-1">Last Name</p>
            <p className="font-medium text-espresso-brown/80">{user?.lastName}</p>
          </div>
          <div>
            <p className="text-soft-terracotta mb-1">Email</p>
            <p className="font-medium text-espresso-brown/80 ">{user?.email}</p>
          </div>
          <div>
            <p className="text-soft-terracotta mb-1">Phone Number</p>
            <p className="font-medium text-espresso-brown/80">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div>
            <p className="text-soft-terracotta mb-1">Gender</p>
            <p className="font-medium text-espresso-brown/80">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>
          <div>
            <p className="text-soft-terracotta mb-1">Date of Birth</p>
            <p className="font-medium text-espresso-brown/80">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import IconBtn from '../../common/IconBtn';
// import { VscEdit } from 'react-icons/vsc';

// const MyProfile = () => {
//   const { user } = useSelector((state) => state.profile);
//   const navigate = useNavigate();

//   return (
//     <div className="w-[850px] h-[700px] pl-15 pr-15 bg-red-950 text-white overflow-y-hidden">
//       <h1 className="text-3xl font-bold  mb-10">My Profile</h1>

//       {/* Profile Card */}
//       <div className="bg-red-900/50 border border-red-800 rounded-lg p-6 mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <img
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-lg font-bold">
//               {user?.firstName} {user?.lastName}
//             </p>
//             <p className="text-sm text-richblack-300">{user?.email}</p>
//           </div>
//         </div>
//        <IconBtn
//        text="Edit"
//         onClick={() => navigate("/dashboard/settings")} 
//          >         
//           <VscEdit />
//          </IconBtn>
//       </div>

//       {/* About Section */}
//       <div className="bg-red-900/50 border border-red-800 rounded-lg p-6 mb-8 flex items-center justify-between">
//         <div>
//           <p className="text-lg font-bold mb-2 underline">About</p>
//           <p className="text-richblack-300">
//             {user?.additionalDetails?.about ?? "Write something about yourself"}
//           </p>
//         </div>
//                <IconBtn
//               text="Edit"
//               onClick={() => navigate("/dashboard/settings")}
//               >
//               <VscEdit />
//               </IconBtn>
//       </div>

//       {/* Personal Details */}
//       <div className="bg-red-900/50 border border-red-800 rounded-lg p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <p className="text-lg font-bold underline">Personal Details</p>
//                  <IconBtn
//                   text="Edit"
//                   onClick={() => navigate("/dashboard/settings")}
//                   >
//                     <VscEdit />
//                   </IconBtn>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
//           <div>
//             <p className="text-richblack-400 mb-1">First Name</p>
//             <p>{user?.firstName}</p>
//           </div>
//           <div>
//             <p className="text-richblack-400 mb-1">Last Name</p>
//             <p>{user?.lastName}</p>
//           </div>
//           <div>
//             <p className="text-richblack-400 mb-1">Email</p>
//             <p>{user?.email}</p>
//           </div>
//           <div>
//             <p className="text-richblack-400 mb-1">Phone Number</p>
//             <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
//           </div>
//           <div>
//             <p className="text-richblack-400 mb-1">Gender</p>
//             <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
//           </div>
//           <div>
//             <p className="text-richblack-400 mb-1">Date of Birth</p>
//             <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;