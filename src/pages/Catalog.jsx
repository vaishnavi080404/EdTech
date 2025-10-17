import React, { useEffect, useState } from 'react';
import Footer from '../components/common/Footer';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/operations/apiconnector';
import { categories } from '../services/operations/apis';
import getCatalogPageData from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Spinner from '../components/common/Spinner';

const Catalog = () => {
  const { catalogName } = useParams();
  const [loading, setLoading] = useState(true); // Start with loading true
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1); // For "Most Popular" vs "New" tabs

  // Fetch category ID from catalog name
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]?._id; // Added optional chaining for safety
        if (category_id) {
          setCategoryId(category_id);
        }
      } catch (error) {
        console.error("Could not fetch categories.", error);
      }
    };
    getCategories();
  }, [catalogName]);

  // Fetch category page data once category ID is available
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error("Could not fetch category details.", error);
      }
      setLoading(false); // Set loading to false after API call is complete
    };
    if (categoryId) {
      setLoading(true); // Set loading to true before the API call
      getCategoryDetails();
    }
  }, [categoryId]);

 if (loading) {
    return (
      // The spinner will be perfectly centered on your branded background
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-soft-terracotta">
        <Spinner />
      </div>
    );
  }



  // Handle case where catalog data might not be found
  if (!catalogPageData?.success || !catalogPageData?.data?.selectedCategory) {
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-soft-terracotta text-espresso-brown">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Category Not Found</h1>
                <p className="mt-2">Sorry, we couldn't find the category you were looking for.</p>
            </div>
        </div>
    )
  }

  return (
    <div className='bg-soft-terracotta text-espresso-brown'>
      {/* --- STYLED HEADER SECTION --- */}
      <div className='bg-gradient-to-l from-warm-stone to-burnt-sienna text-white'>
        <div className='mx-auto flex min-h-[260px] max-w-maxContent flex-col justify-center gap-4 px-4 py-8'>
          <p className='text-sm italic text-soft-terracotta/80'>
            {`Home / Catalog / `}
            <span className='text-golden-sunshine font-semibold'>
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className='text-4xl font-bold font-serif'>
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className='max-w-[870px] text-soft-terracotta italic'>
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      <div className='mx-auto w-full max-w-maxContent px-4 py-12'>
        {/* Section 1: Courses to get you started */}
        <h2 className='text-3xl font-bold mb-4'>Courses to get you started</h2>
        {/* --- STYLED TABS --- */}
        <div className="flex rounded-full bg-warm-stone/20 p-1 max-w-max">
          <button
            className={`px-6 py-2 rounded-full transition-all duration-300 ${active === 1 ? "bg-warm-stone text-white shadow-md" : "hover:bg-warm-stone/50 hover:text-white"}`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all duration-300 ${active === 2 ? "bg-warm-stone text-white shadow-md" : "hover:bg-warm-stone/50 hover:text-white"}`}
            onClick={() => setActive(2)}
          >
            New
          </button>
        </div>
        <div className="mt-6">
          <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
        </div>
      </div>
      
      {/* Section 2: Top Courses in... */}
      {catalogPageData?.data?.differentCategory?.courses?.length > 0 && (
        <div className='mx-auto w-full max-w-maxContent px-4 py-12'>
          <h2 className='text-3xl font-bold mb-6'>
            Top Courses in <span className="text-burnt-sienna">{catalogPageData?.data?.differentCategory?.name}</span>
          </h2>
          <div>
            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
          </div>
        </div>
      )}

      {/* Section 3: Frequently Bought Together */}
      {catalogPageData?.data?.mostSellingCourses?.length > 0 && (
        <div className='mx-auto w-full max-w-maxContent px-4 py-12'>
          <h2 className='text-3xl font-bold mb-8'>Frequently Bought Together</h2>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, index) => (
                <Course_Card course={course} key={index} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Catalog;

//   return (
//     <div className='text-white box-content'>
//       {/* Header Section */}
//       <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 bg-richblack-800 px-4 lg:max-w-maxContent'>
//         <p className='text-sm text-richblack-300'>
//           {`Home / Catalog / `}
//           <span className='text-yellow-25'>
//             {catalogPageData?.data?.selectedCategory?.name}
//           </span>
//         </p>
//         <p className='text-3xl text-richblack-5'>
//           {catalogPageData?.data?.selectedCategory?.name}
//         </p>
//         <p className='max-w-[870px] text-richblack-200'>
//           {catalogPageData?.data?.selectedCategory?.description}
//         </p>
//       </div>

//       <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
//         {/* Section 1: "Most Popular" Courses */}
//         <div className='section_heading'>Courses to get you started</div>
//         <div className="my-4 flex border-b border-b-richblack-600 text-sm">
//           <p
//             className={`px-4 py-2 ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
//             onClick={() => setActive(1)}
//           >
//             Most Popular
//           </p>
//           <p
//             className={`px-4 py-2 ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
//             onClick={() => setActive(2)}
//           >
//             New
//           </p>
//         </div>
//         <div>
//           <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
//         </div>
//       </div>
      
//       {/* Section 2: "Top Courses in..." */}
//       {/* Only render this section if differentCategory has courses */}
//       {catalogPageData?.data?.differentCategory?.courses?.length > 0 && (
//         <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
//           <div className='section_heading'>
//             Top Courses in {catalogPageData?.data?.differentCategory?.name}
//           </div>
//           <div className="py-8">
//             {/* FIX #1: Corrected the property name to 'differentCategory' */}
//             <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
//           </div>
//         </div>
//       )}

//       {/* Section 3: "Frequently Bought Together" */}
//       {/* Only render this section if mostSellingCourses has courses */}
//       {catalogPageData?.data?.mostSellingCourses?.length > 0 && (
//         <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
//           <div className='section_heading'>Frequently Bought Together</div>
//           <div className='py-8'>
//             <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
//               {/* FIX #2: Correctly used .map() with an implicit return using parentheses () */}
//               {catalogPageData?.data?.mostSellingCourses
//                 ?.slice(0, 4)
//                 .map((course, index) => (
//                   <Course_Card course={course} key={index} Height={"h-[400px]"} />
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Catalog;
