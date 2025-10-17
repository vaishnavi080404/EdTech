
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from '../services/operations/profileAPI';
import { formatDate } from '../services/formatDate';
import Spinner from '../components/common/Spinner';
//import Spinner from '../../common/Spinner'; // Using a consistent spinner

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState(null);

   const [loading, setLoading] = useState(true);
  useEffect(() => {
     const fetchPurchaseHistory = async () => {
      setLoading(true);
       try {
         const res = await getPurchaseHistory(token);
         setOrders(res);
       } catch (error) {
         console.log("Could not fetch purchase history.");
       }
     };
     fetchPurchaseHistory();
      setLoading(false);
   }, [token]);

  return (
    <>
      <h1 className="mb-14 text-3xl font-bold text-soft-terracotta mt-10">
        My Purchase History
      </h1>
       {loading ? (
        <div className="grid min-h-[calc(100vh-10rem)] place-items-center">
          <Spinner />
        </div>
      ) : !orders || !orders.length ? (
        <div className="grid h-[50vh] w-full place-content-center bg-warm-stone/10 rounded-lg">
          <p className="text-2xl font-semibold text-soft-terracotta/70">
            You have not purchased any course yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            // --- STYLED ORDER CARD ---
            <div key={order._id} className="rounded-lg border border-warm-stone/20 bg-warm-stone/10 p-4 shadow-md">
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-warm-stone/20 pb-2 mb-4 gap-2">
                <p className="text-sm text-soft-terracotta/80">
                  Purchased on: {formatDate(order.createdAt)}
                </p>
                <p className="text-lg font-semibold text-burnt-sienna">
                  Total: ₹ {order.amount}
                </p>
              </div>

              {/* Card Body with Course Details */}
              <div className="space-y-4">
                {order.courses.map((course) => (
                  <div key={course._id} className="flex flex-col sm:flex-row items-center gap-4">
                    <Link to={`/courses/${course._id}`} className="shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="h-20 w-32 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                    <div className="flex-1">
                      <h2 className="font-semibold text-espresso-brown">{course.courseName}</h2>
                      <p className="text-sm text-soft-terracotta/50">
                        By {course.instructor.firstName} {course.instructor.lastName}
                      </p>
                    </div>
                    {/* Go to Course Button */}
                    <Link to={`/dashboard/enrolled-courses`} className="w-full sm:w-auto">
                      <button className="
                        w-full sm:w-auto mt-2 sm:mt-0 text-sm font-semibold text-white bg-burnt-sienna
                        px-4 py-2 rounded-md transition-all duration-200
                        hover:bg-burnt-sienna/90 hover:-translate-y-0.5
                      ">
                        Go to Course
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getPurchaseHistory } from '../services/operations/profileAPI'; // We will create this next
// import { formatDate } from '../services/formatDate';

// export default function PurchaseHistory() {
//   const { token } = useSelector((state) => state.auth);
//   const [orders, setOrders] = useState(null);

//   useEffect(() => {
//     const fetchPurchaseHistory = async () => {
//       try {
//         const res = await getPurchaseHistory(token);
//         setOrders(res);
//       } catch (error) {
//         console.log("Could not fetch purchase history.");
//       }
//     };
//     fetchPurchaseHistory();
//   }, [token]);

//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//         My Purchase History
//       </h1>
//       {!orders ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !orders.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not purchased any course yet.
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order._id} className="rounded-lg border border-richblack-700 bg-richblack-800 p-4">
//               <div className="flex justify-between items-center border-b border-richblack-600 pb-2 mb-4">
//                 <p className="text-sm text-richblack-300">
//                   Purchased on: {formatDate(order.createdAt)}
//                 </p>
//                 <p className="text-lg font-semibold text-yellow-50">
//                   Total: ₹ {order.amount}
//                 </p>
//               </div>
//               <div className="space-y-4">
//                 {order.courses.map((course) => (
//                   <div key={course._id} className="flex items-center gap-4">
//                     <Link to={`/courses/${course._id}`}>
//                       <img
//                         src={course.thumbnail}
//                         alt={course.courseName}
//                         className="h-20 w-32 rounded-lg object-cover"
//                       />
//                     </Link>
//                     <div className="flex-1">
//                       <h2 className="font-semibold text-richblack-5">{course.courseName}</h2>
//                       <p className="text-sm text-richblack-300">
//                         By {course.instructor.firstName} {course.instructor.lastName}
//                       </p>
//                       <Link to={`/dashboard/enrolled-courses`}>
//                          <button className="mt-2 text-sm text-yellow-100 bg-richblack-700 px-3 py-1 rounded-md hover:bg-richblack-600">
//                              Go to Courses
//                          </button>
//                        </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }