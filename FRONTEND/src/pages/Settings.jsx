import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IconBtn from "../components/common/IconBtn";
import UpdateDisplayPicture from "../components/core/Dashboard/Settings/UpdateDisplayPiture";
import { updateProfile, changePassword } from "../services/operations/authAPI";
import { deleteProfile } from "../services/operations/authAPI";
import ConfirmationModal from "../components/common/ConfirmationModal";

const Settings = () => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
   const {
     register,
     handleSubmit,
     reset,
     formState: { isDirty },
   } = useForm();
   const [previousValues, setPreviousValues] = useState({});
   // State to manage the confirmation modal
   const [showModal, setShowModal] = useState(false);
   useEffect(() => {
     if (user) {
       const initialValues = {
         firstName: user.firstName || "",
         lastName: user.lastName || "",
         dateOfBirth: user?.additionalDetails?.dateOfBirth?.split("T")[0] || "",
         gender: user?.additionalDetails?.gender || "",
         contactNumber: user?.additionalDetails?.contactNumber || "",
         about: user?.additionalDetails?.about || "",
       };
       reset(initialValues);
       setPreviousValues(initialValues);
     }
   }, [user, reset]);
   const onSubmit = (data) => {
     const updatedData = {
       dateOfBirth: data.dateOfBirth,
       about: data.about,
       contactNumber: data.contactNumber,
       gender: data.gender,
     };
     dispatch(updateProfile(updatedData));
   };
   const handleCancel = () => {
     reset(previousValues);
   };
  
   const handleDeleteAccount = () => {
     dispatch(deleteProfile(navigate)); 
     setShowModal(false); 
   };
  
   const openConfirmationModal = () => {
     setShowModal(true);
   };
  
   const closeConfirmationModal = () => {
     setShowModal(false);
   };

   const modalData = {
     text1: "Are you sure?",
     text2: "This action is permanent and cannot be undone.",
     btn1Text: "Delete",
     btn2Text: "Cancel",
     btn1Handler: handleDeleteAccount,
     btn2Handler: closeConfirmationModal,
   };

  return (
  
    <div className="text-soft-terracotta w-11/12 max-w-[1000px] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

     
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-warm-stone/10 p-6 rounded-lg border border-soft-terracotta/50 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-soft-terracotta">Change Profile Picture</p>
            <p className="text-sm text-espresso-brown/70">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UpdateDisplayPicture />
        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="p-6 bg-warm-stone/10 rounded-lg border border-soft-terracotta/50 shadow-md">
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input type="text" {...register("firstName")} disabled className="w-full p-2 mt-1 rounded bg-warm-stone/50 text-espresso-brown/50 cursor-not-allowed" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input type="text" {...register("lastName")} disabled className="w-full p-2 mt-1 rounded bg-warm-stone/50 text-espresso-brown/50 cursor-not-allowed" />
            </div>
            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <input type="date" {...register("dateOfBirth")} className="w-full p-2 mt-1 rounded bg-warm-stone/50 border border-warm-stone/50 focus:outline-none focus:ring-2 focus:ring-burnt-sienna" />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select {...register("gender")} className="w-full p-2 mt-1 rounded bg-warm-stone/80 border border-warm-stone/50 focus:outline-none focus:ring-2 focus:ring-burnt-sienna">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Contact Number</label>
              <input type="text" {...register("contactNumber")} className="w-full p-2 mt-1 rounded bg-warm-stone/50 border border-warm-stone/50 focus:outline-none focus:ring-2 focus:ring-burnt-sienna" />
            </div>
            <div>
              <label className="text-sm font-medium">About</label>
              <textarea {...register("about")} rows="3" className="w-full p-2 mt-1 rounded bg-warm-stone/50 border border-warm-stone/50 resize-none focus:outline-none focus:ring-2 focus:ring-burnt-sienna" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-6">
          <button type="button" onClick={handleCancel} className="bg-warm-stone px-6 py-2 rounded-md text-white font-semibold transition-all duration-200 hover:bg-warm-stone/80">Cancel</button>
          <IconBtn type="submit" text="Save Changes" />
        </div>
      </form>


      <div className="mt-16 p-6 bg-warm-stone/10 rounded-lg border border-soft-terracotta/50 shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <form onSubmit={handleSubmit(async (data) => { /* ... form logic ... */ })} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-medium">Current Password</label>
            <input type="password" {...register("oldPassword", { required: true })} className="w-full p-2 mt-1 rounded bg-warm-stone/50 border border-warm-stone/50 focus:outline-none focus:ring-2 focus:ring-burnt-sienna" placeholder="Enter current password" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-medium">New Password</label>
            <input type="password" {...register("newPassword", { required: true })} className="w-full p-2 mt-1 rounded bg-warm-stone/50 border border-warm-stone/50 focus:outline-none focus:ring-2 focus:ring-burnt-sienna" placeholder="Enter new password" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <input type="password" {...register("confirmNewPassword", { required: true })} className="w-full p-2 mt-1 rounded bg-warm-stone/50 border border-warm-stone/50 focus:outline-none focus:ring-2 focus:ring-burnt-sienna" placeholder="Confirm new password" />
          </div>
          <div className="col-span-2 flex justify-end">
            <IconBtn type="submit" text="Update Password" />
          </div>
        </form>
      </div>


      <div className="mt-16 p-6 bg-rose-700 rounded-lg border border-rose-gold/50">
        <h2 className="text-xl font-semibold text-espresso-brown flex items-center gap-3">
          <span className="text-red-500 text-2xl">⚠️</span> Delete Account
        </h2>
        <p className="text-sm text-espresso-brown my-2">
          This action is permanent and cannot be undone. All your data including purchased courses will be lost.
        </p>
        <button className="text-red-300 underline font-semibold hover:text-red-800 transition-colors duration-200" onClick={openConfirmationModal}>
          I want to delete my account
        </button>
      </div>

      {showModal && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default Settings;

