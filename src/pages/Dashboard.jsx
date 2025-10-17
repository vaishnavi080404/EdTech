import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Spinner from '../components/common/Spinner';
import { useActivityTracker } from '../hooks/useActivityTracter';

const Dashboard = () => {
  useActivityTracker();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-soft-terracotta">
        <Spinner />
      </div>
    );
  }

  return (
    // --- THIS IS THE GUARANTEED FIX ---
    // The main container is now a grid, which is better for full-height columns.
    // The sidebar has a fixed width, and the content area takes the rest of the space.
    <div className='relative grid grid-cols-[auto_1fr] min-h-[calc(100vh-3.5rem)] bg-gradient-to-l from-espresso-brown to-rose-gold text-soft-terracotta'>
      
      {/* The Sidebar is now a direct child of the grid */}
      <Sidebar />

      {/* The main content area */}
      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
        {/* The border is now on the content, not the sidebar, for a cleaner look */}
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 border-l border-warm-stone/20">
          <Outlet />
        </div>
      </div>
    </div>
    // --- END OF FIX ---
  )
}

export default Dashboard;


// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/core/Dashboard/Sidebar';

// const Dashboard = () => {

//   const {loading:authLoading} = useSelector((state) => state.auth);
//   const {loading:profileLoading} = useSelector((state) => state.profile);
  
//   if(authLoading || profileLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
//       <Sidebar/>

//       <div className="h-[calc(100vh-3.5rem)] w-full overflow-y-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">

//           <Outlet/>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Dashboard