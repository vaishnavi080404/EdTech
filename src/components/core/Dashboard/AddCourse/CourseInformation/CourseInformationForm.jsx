import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import ChipInput from './ChipInput';
import RequirementsField from './RequirementField';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn'
import { COURSE_STATUS } from "../../../../../utils/constants"
import { addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { setStep,setCourse } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  }= useForm();

  const dispatch =useDispatch();
  const  {token} =useSelector((state)=>state.auth)
  const {course,editCourse}=useSelector((state)=>state.course);
  const [loading, setLoading]=useState(false);
  const [courseCategories, setCourseCategories] = useState([])


useEffect(() => {
  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  // Pre-fill form fields only if edit mode
  if (editCourse && course) {
    setValue("courseTitle", course.courseName);
    setValue("courseShortDesc", course.courseDescription);
    setValue("coursePrice", course.price);
    setValue("courseTags", course.tag);
    setValue("courseBenefits", course.whatYouWilllLarn);
    setValue("courseCategory", course.category._id);
    setValue("courseRequirements",  course.instructions);
    setValue("courseImage", course.thumbnail);
  }

  getCategories();
}, [editCourse, course, setValue]);




const isFormUpdated = () => {
    const currentValues = getValues();
    
    // Helper function to safely convert to string for comparison
    const safeToString = (value) => (value || []).toString();

    // Now we compare safely
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      safeToString(currentValues.courseTags) !== safeToString(course.tag) ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      safeToString(currentValues.courseRequirements) !== safeToString(course.instructions) ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
}

const onSubmit = async (data) => {
    console.log("Form data ", data)

    if (editCourse) {
      const currentValues = getValues()
       console.log("changes after editing form values:", currentValues)
       console.log("now course:", course)
       console.log("Has Form Changed:", isFormUpdated())
        if (isFormUpdated()) {
            const currentValues = getValues()
            const formData = new FormData()
            
            // Helper function for safe string comparison
            const safeToString = (value) => (value || []).toString();

            formData.append("courseId", course._id)

            if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle)
            }
            if (currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc)
            }
            if (currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice)
            }
            // --- FIX 1: Use the safe comparison ---
            if (safeToString(currentValues.courseTags) !== safeToString(course.tag)) {
                formData.append("tag", JSON.stringify(data.courseTags))
            }
            if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits)
            }
            if (currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory)
            }
            // --- FIX 2: Use the safe comparison ---
            if (safeToString(currentValues.courseRequirements) !== safeToString(course.instructions)) {
                formData.append(
                    "instructions",
                    JSON.stringify(data.courseRequirements)
                )
            }
            if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
            }
            
            setLoading(true)
            const result = await editCourseDetails(formData, token)
            setLoading(false)
            if (result) {
                dispatch(setStep(2))
                dispatch(setCourse(result))
                console.log("step2", result)
            }
        } else {
            toast.error("No changes made to the form")
        }
        return
    }

    // This part for creating a new course is fine
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
    } else {
        toast.error("Failed to create course") // More specific error
    }
    setLoading(false)
}


  

const floatingLabelClasses = "absolute top-3 left-4 px-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-warm-stone duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-4 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-burnt-sienna";
  // A consistent class for the input field
  const floatingInputClasses = "peer block w-full px-4 pt-5 pb-1  bg-mid-gray/50 border-2 border-warm-stone/20 rounded-lg appearance-none text-soft-terracotta focus:outline-none focus:ring-0 focus:border-burnt-sienna";

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 rounded-md border border-warm-stone/20 bg-soft-terracotta/80 p-8"
  >
    {/* --- Section 1: Core Course Details --- */}
    <div className="border-b border-warm-stone/20 pb-6">
      <h3 className="text-xl font-semibold text-espresso-brown mb-6">Course Information</h3>
      <div className="space-y-6">
        {/* Course Title */}
        <div className="relative z-0">
          <input
            id="courseTitle"
            placeholder=" "
            {...register("courseTitle", { required: true })}
            className={floatingInputClasses}
          />
          <label htmlFor="courseTitle" className={floatingLabelClasses}>
            Course Title <sup className="text-pink-400">*</sup>
          </label>
          {errors.courseTitle && (
            <span className="ml-2 text-xs text-pink-400">Course title is required</span>
          )}
        </div>

        {/* Course Short Description */}
        <div className="relative z-0">
          <textarea
            id="courseShortDesc"
            placeholder=" "
            {...register("courseShortDesc", { required: true })}
            className={`${floatingInputClasses} resize-none min-h-[130px]`}
          />
          <label htmlFor="courseShortDesc" className={floatingLabelClasses}>
            Course Short Description <sup className="text-pink-400">*</sup>
          </label>
          {errors.courseShortDesc && (
            <span className="ml-2 text-xs text-pink-400">Course description is required</span>
          )}
        </div>
      </div>
    </div>

    {/* --- Section 2: Pricing, Category, and Media --- */}
    <div className="border-b border-warm-stone/20 pb-6">
      <h3 className="text-xl font-semibold text-espresso-brown mb-6">Course Price</h3>
      <div className="space-y-6">
        {/* Course Price */}
        <div className="relative z-0">
          <input
            id="coursePrice"
            placeholder=" "
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className={`${floatingInputClasses} !pl-12`}
          />
          <label htmlFor="coursePrice" className={floatingLabelClasses }  >
            Course Price <sup className="text-pink-400">*</sup>
          </label>
          <HiOutlineCurrencyRupee className="absolute left-1 gap-x-5 top-1/2 -translate-y-1/2 text-xl text-espresso-brown" />
          {errors.coursePrice && (
            <span className="ml-2 text-xs text-pink-400">Course price is required</span>
          )}
        </div>

        {/* Course Category */}
        <div>
          <label
            className="text-sm text-espresso-brown"
            htmlFor="courseCategory"
          >
            Course Category <sup className="text-pink-400">*</sup>
          </label>
          <select
            {...register("courseCategory", { required: true })}
            defaultValue=""
            id="courseCategory"
            className={`${floatingInputClasses} !pt-3 !pb-3`}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories?.map((cat, i) => (
                <option key={i} value={cat?._id}>
                  {cat?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="ml-2 text-xs text-pink-400">Course category is required</span>
          )}
        </div>

        {/* Course Tags & Thumbnail */}
        <ChipInput
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />
      </div>
    </div>

    {/* --- Section 3:  --- */}
    <div>
      <h3 className="text-xl font-semibold text-espresso-brown mb-6">Benefits</h3>
      <div className="space-y-6">
        {/* Benefits */}
        <div className="relative z-0">
          <textarea
            id="courseBenefits"
            placeholder=" "
            {...register("courseBenefits", { required: true })}
            className={`${floatingInputClasses} resize-none min-h-[130px]`}
          />
          <label htmlFor="courseBenefits" className={floatingLabelClasses}>
            Benefits of the course <sup className="text-pink-400">*</sup>
          </label>
          {errors.courseBenefits && (
            <span className="ml-2 text-xs text-pink-400">Course benefits are required</span>
          )}
        </div>

        {/* Requirements */}
        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end gap-x-4">
      {editCourse && (
        <IconBtn
          type="button"
          onClick={() => dispatch(setStep(2))}
          disabled={loading}
          text="Continue Without Saving"
          outline={true}
        />
      )}
      <IconBtn
        type="submit"
        disabled={loading}
        text={!editCourse ? "Next" : "Save Changes"}
      >
        <MdNavigateNext />
      </IconBtn>
    </div>
  </form>
)

}

export default CourseInformationForm



//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
//     >
//       {/* ✅ Course Title */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseTitle">
//           Course Title <sup className="text-pink-200">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: "Course title is required" })}
//           className="form-style w-full"
//         />
//         {errors.courseTitle && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             {errors.courseTitle.message}
//           </span>
//         )}
//       </div>

//       {/* ✅ Course Short Description */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
//           Course Short Description <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", {
//             required: "Course description is required",
//           })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseShortDesc && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             {errors.courseShortDesc.message}
//           </span>
//         )}
//       </div>

//       {/* ✅ Course Price */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="coursePrice">
//           Course Price <sup className="text-pink-200">*</sup>
//         </label>
//         <div className="relative">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: "Course price is required",
//               valueAsNumber: true,
//             })}
//             className="form-style w-full !pl-12"
//           />
//           <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
//         </div>
//         {errors.coursePrice && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             {errors.coursePrice.message}
//           </span>
//         )}
//       </div>

//       {/* ✅ Course Category */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseCategory">
//           Course Category <sup className="text-pink-200">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", {
//             required: "Course category is required",
//           })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-style w-full"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             {errors.courseCategory.message}
//           </span>
//         )}
//       </div>

//       {/* ✅ Course Tags */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />

//       {/* ✅ Upload Image/Video */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />

//       {/* ✅ Benefits */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
//           Benefits of the course <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter benefits of the course"
//           {...register("courseBenefits", {
//             required: "Benefits of the course are required",
//           })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseBenefits && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             {errors.courseBenefits.message}
//           </span>
//         )}
//       </div>

//       {/* ✅ Requirements */}
//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />

//       {/* ✅ Action Buttons */}
// <div className="flex justify-end gap-x-2">
//   {editCourse && (
//     <button
//       type="button"   // ✅ doesn’t trigger validation
//       onClick={() => dispatch(setStep(2))}
//       disabled={loading}
//       className="flex cursor-pointer items-center gap-x-2 rounded-md 
//                  bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 
//                  hover:bg-richblack-400 transition"
//     >
//       Continue Without Saving
//     </button>
//   )}

//   <IconBtn
//     type="submit"      // ✅ triggers validation
//     disabled={loading}
//     text={!editCourse ? "Next" : "Save Changes"}
//   >
//     <MdNavigateNext />
//   </IconBtn>
// </div>

//     </form>
//   )
// }

// export default CourseInformation

// A consistent class for the floating label itself