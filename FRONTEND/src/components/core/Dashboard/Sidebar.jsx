import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import SidebarLink from './SidebarLinks';
import { useNavigate } from 'react-router-dom';
import { VscSignOut, VscMenu, VscChromeClose } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle

  if (profileLoading || authLoading) {
    return (
      <div className="w-[222px] flex items-center justify-center bg-espresso-brown">
        loading
      </div>
    );
  }

  return (
    <div>
      {/* --- MOBILE TOGGLE BUTTON --- */}
      <div className="lg:hidden fixed top-14 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-espresso-brown focus:outline-none"
        >
          {isOpen ? <VscChromeClose /> : <VscMenu />}
        </button>
      </div>

      {/* --- SIDEBAR CONTAINER --- */}
      <div
        className={`fixed mt-8 left-0 h-screen min-w-[220px] 
          bg-soft-terracotta/80 border-r border-rose-gold 
          transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:flex `}
      >
        <div className="flex flex-col py-10 w-full">
          {/* Main Navigation Links */}
          <div className="flex flex-col ">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink
                  key={link.id}
                  link={{ name: link.name, path: link.path }}
                  iconName={link.icon}
                />
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-warm-stone/50 "></div>

          {/* Settings & Logout */}
          <div className="flex flex-col pb-8 ">
            <SidebarLink
              link={{ name: 'Settings', path: '/dashboard/settings' }}
              iconName="VscSettingsGear"
              
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: 'Are you sure?',
                  text2: 'You will be logged out of your account.',
                  btn1Text: 'Logout',
                  btn2Text: 'Cancel',
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-soft-terracotta/80 
              transition-all duration-200 hover:text-rose-gold"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg text-red-600" />
                <span className='text-red-700'>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { sidebarLinks } from '../../../data/dashboard-links';
// import { logout } from '../../../services/operations/authAPI';
// import SidebarLink from './SidebarLinks';
// import { useNavigate } from 'react-router-dom';
// import { VscSignOut, VscSettingsGear } from 'react-icons/vsc';
// import ConfirmationModal from '../../common/ConfirmationModal';

// const Sidebar = () => {
//   const {  loading: authLoading } = useSelector((state) => state.auth);
//   const { user, loading: profileLoading } = useSelector((state) => state.profile);
// console.log("Full User Object:", user);// Debugging line to check the full user object accountType wasnt being fetch since user was passed in auth

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [confirmationModal, setConfirmationModal] = useState(null);

//   if (authLoading || profileLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className='flex min-w-[222px] flex-col border-r-[1px] border-gray-500 bg-gray-800 py-10 h-[calc(100vh-3.5rem)]'>
//         <div className='flex flex-col'>
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null;
//             console.log("User Account Type:", user?.accountType);
//             return (
//               <SidebarLink
//                 key={link.id}
//                 link={{ name: link.name, path: link.path }}
//                 iconName={link.icon} // Make sure this matches something like "VscDashboard"
//               />
//             );
//           })}
//         </div>

//         <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700'></div>

//         <div>
//           {/* Static Settings Link */}
//           <SidebarLink
//             link={{ name: 'Settings', path: '/dashboard/settings' }}
//             iconName='VscSettingsGear'
//           />

//           {/* Logout Button */}
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: 'Are you sure you want to logout?',
//                 text2: 'You will be logged out of your account.',
//                 btn1: 'Logout',
//                 btn2: 'Cancel',
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className='flex items-center gap-3 px-8 py-2 rounded-md text-white hover:bg-gray-700 transition'
//           >
//             <div className='flex items-center gap-x-3'>
//               <VscSignOut className='text-lg' />
//               <span className='hidden md:inline-block'>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>

//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </div>
//   );
// };

// export default Sidebar;
