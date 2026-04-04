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

    <div className='relative grid grid-cols-[auto_1fr] min-h-[calc(100vh-3.5rem)] bg-gradient-to-l from-espresso-brown to-rose-gold text-soft-terracotta'>
      
     
      <Sidebar />

    
      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 border-l border-warm-stone/20">
          <Outlet />
        </div>
      </div>
    </div>
   
  )
}

export default Dashboard;


