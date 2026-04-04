import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {GrAddCircle} from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import { setEditCourse,setCourse, setStep } from '../../../../../slices/courseSlice';
import {toast} from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

    const {register, handleSubmit, setValue, formState:{errors}}=useForm();

    const [editSectionName, setEditSectionName] = useState(null)
    const {course} =useSelector((state)=>state.course)
    const dispatch = useDispatch();
    const [loading, setLoading]=useState(false)
    const {token} =useSelector((state)=>state.auth)

    console.log("Course:", course)

    const onSubmit =async (data)=>{
      setLoading(true);
      let result;

      if (editSectionName){
        //if we r editing
        result =await updateSection(
          {
            sectionName:data.sectionName,
            sectionId:editSectionName,
            courseId:course._id,
          },token
        )
      }
      else{
        result = await createSection({
          sectionName:data.sectionName,
          courseId:course._id,

        },token)
      }
      //update values
      if(result){
        dispatch(setCourse(result))
        setEditSectionName(null);
        setValue("sectionName","")
      }
      //loading false
      setLoading(false)
      console.log("RESULT in onSubmit:", result)

    }
 

    const cancelEdit =()=>{
      setEditSectionName(null);
      setValue("sectionName",  "")
    }

    const goBack= () =>{
      dispatch(setStep(1));
      dispatch(setEditCourse(true));

    }

    const goToNext = () =>{
      if(course.courseContent.length === 0){
         toast.error("Please add atleast one section")
         return;
      
      }

      if(course.courseContent.some((section)=>section.subSection.length ===0)){
        toast.error("Please add atleast one lecture in each section")
        return;
      }
       //if everything is completed
       dispatch(setStep(3))

    }

    const handleChangeEdiSectiontName = (sectionName,sectionId)=>{
      if(editSectionName === sectionId){
        cancelEdit();
        return;
      }
      setEditSectionName(sectionId);
      setValue("sectionName", sectionName)
    }




return (
  // --- MAIN CONTAINER ---
  <div className="bg-soft-terracotta/70 border border-warm-stone/30 rounded-xl p-6 shadow-md space-y-8">
    <h2 className="text-2xl font-bold text-espresso-brown">
      Course Builder
    </h2>

    {/* --- FORM SECTION --- */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="sectionName"
          className="text-sm font-medium text-espresso-brown"
        >
          Section Name <sup className="text-pink-400">*</sup>
        </label>
        <input
          id="sectionName"
          placeholder="Add a section to build your course"
          {...register("sectionName", { required: true })}
          className="w-full mt-2 px-4 py-2 rounded-lg bg-mid-gray/50 text-soft-terracotta border border-burnt-sienna placeholder:text-soft-terracotta focus:outline-none focus:ring-2 focus:ring-burnt-sienna transition-all"
        />
        {errors.sectionName && (
          <span className="text-xs text-pink-400">
            Section Name is required
          </span>
        )}
      </div>

      {/* Buttons under form */}
      <div className="flex items-center gap-x-4">
        <IconBtn
          type="submit"
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
        >
          <GrAddCircle className="text-golden-sunshine" />
        </IconBtn>

        {editSectionName && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-sm text-soft-terracotta hover:underline hover:text-burnt-sienna transition-colors duration-200"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    {/* --- NESTED VIEW --- */}
    {course.courseContent.length > 0 && (
      <div className="mt-6">
        <NestedView handleChangeEditSectionName={handleChangeEdiSectiontName} />
      </div>
    )}

    {/* --- NAVIGATION BUTTONS --- */}
    <div className="flex justify-end gap-x-4 mt-10">
      <IconBtn
        text="Back"
        onClick={goBack}
        outline={true}
      />
      <IconBtn text="Next" onClick={goToNext}>
        <BiRightArrow />
      </IconBtn>
    </div>
  </div>
)

}

export default CourseBuilderForm;

//   return (
//     <div className='text-white'> 
//       <p>Course Builder </p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='mt-10 mb-5'> 
//             <label htmlFor='sectionName'>Section Name<sup>*</sup></label>
//             <input
//             id='sectionName'
//             placeholder='Add Section Name'
//             {...register("sectionName",{required:true})}
//             className='w-full mt-3'
//             />
//             {errors.sectionName && (<span>Section Name is required</span>)}
//         </div>
//         <div className='flex w-full'>
//           <IconBtn
//           type='Submit'
//           text={editSectionName ? "Edit Section Name" : "Create Section "}
//           outline={true}
          
//           >
//             <GrAddCircle className='text-amber-300 '/>
            
//           </IconBtn>
//           {editSectionName && (
//             <button
//             type='button'
//             onClick={cancelEdit}
//             className='text-sm text-gray-400 underline ml-5'
//             >
//               Cancel Edit
//             </button>
//           ) }

          
//         </div>
//       </form>


//       {course.courseContent.length > 0 && (
//         <NestedView handleChangeEditSectionName={handleChangeEdiSectiontName}/>
//       )}

//       <div className='flex justify-end gap-x-4'>
//         <button
//         onClick={goBack}
//         className='rounded-md courser-pointer'
//         >
//           Back
//         </button>
//         <IconBtn
//         text="Next" onClick={goToNext}
//         >
//           <BiRightArrow/>

//         </IconBtn>
//       </div>


//     </div>
//   )
// }

// export default CourseBuilderForm