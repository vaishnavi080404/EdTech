import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 1. IMPORT THE GLOBAL HANDLER FROM YOUR API CONNECTOR
import { setGlobalModalHandler } from './services/operations/apiconnector'; 

// Import Pages and Components
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import Settings from './pages/Settings';
import Cart from './components/core/Dashboard/Cart';
import EnrolledCourses from './components/core/Dashboard/Settings/EnrolledCourses';
import PurchaseHistory from './pages/PurchaseHistory';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';
import AddCourse from './components/core/Dashboard/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourses/VideoDetails';
import Error from './pages/Error';
import Preloader from './components/common/Preloader';
import ScrollToTop from './components/common/ScrollToTop';
import ConfirmationModal from './components/common/ConfirmationModal';
import { ACCOUNT_TYPE } from './utils/constants';
import CompareProgress from './pages/CompareProgress';
import MyCertificates from './pages/MyCertificates';

function App() {
  const { user } = useSelector((state) => state.profile);
  
  // 2. CREATE STATE TO HOLD THE MODAL DATA
  const [modalData, setModalData] = useState(null);
  
  // State to control the pre-loader's visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3. SET THE GLOBAL HANDLER FOR THE SESSION EXPIRED MODAL
    // This connects your apiConnector to this component's state.
    setGlobalModalHandler(setModalData);
  }, []);

  useEffect(() => {
    // Safety timer for the pre-loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  // This function is called by the Preloader when its fade-out animation ends
  const handleAnimationEnd = () => {
    setLoading(false);
  };

  return (
    <div className="w-screen min-h-screen bg-soft-terracotta flex flex-col font-sans">
      
      {/* Pre-loader and the re-integrated Global Modal */}
      {loading && <Preloader onAnimationEnd={handleAnimationEnd} />}
      {modalData && <ConfirmationModal modalData={modalData} />}

      {/* The main app content is only rendered after the pre-loader is finished */}
      {!loading && (
        <>
          <Navbar />
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password/:id" element={<UpdatePassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="catalog/:catalogName" element={<Catalog />} />
            <Route path="courses/:courseId" element={<CourseDetails />} />

            {/* Dashboard Routes */}
            <Route element={<Dashboard />}>
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/settings" element={<Settings />} />

              {/* Student Routes */}
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
                  <Route path="dashboard/compare-progress" element={<CompareProgress />} />
                  <Route path="dashboard/my-certificates" element={<MyCertificates/>} />
                </>
              )}

              {/* Instructor Routes */}
              {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="dashboard/instructor" element={<Instructor />} />
                  <Route path="dashboard/add-course" element={<AddCourse />} />
                  <Route path="dashboard/my-courses" element={<MyCourses />} />
                  <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                </>
              )}
            </Route>

            {/* View Course Route */}
            <Route element={<ViewCourse />}>
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              )}
            </Route>

            {/* 404 Error Page */}
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;