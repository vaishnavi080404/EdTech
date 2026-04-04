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

  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]?._id;
        if (category_id) {
          setCategoryId(category_id);
        }
      } catch (error) {
        console.error("Could not fetch categories.", error);
      }
    };
    getCategories();
  }, [catalogName]);


  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error("Could not fetch category details.", error);
      }
      setLoading(false); 
    };
    if (categoryId) {
      setLoading(true); 
      getCategoryDetails();
    }
  }, [categoryId]);

 if (loading) {
    return (

      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-soft-terracotta">
        <Spinner />
      </div>
    );
  }




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
        
        <h2 className='text-3xl font-bold mb-4'>Courses to get you started</h2>
        
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
