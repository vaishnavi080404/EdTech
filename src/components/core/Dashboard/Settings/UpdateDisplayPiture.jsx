import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDisplayPicture } from '../../../../services/operations/authAPI';
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi"; // A nice icon for the upload button

const UpdateDisplayPicture = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  // --- All logic is unchanged ---
 const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSource(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = () => {
    if (!imageFile) {
      alert("Please select an image file first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", imageFile);
    dispatch(updateDisplayPicture(formData));
  };
  return (
    // The main container has a slightly larger gap for better spacing
    <div className="flex flex-col gap-4 items-start">
      {/* The preview image now has a subtle branded border */}
      {previewSource && (
        <img
          src={previewSource}
          alt="Preview"
          className="h-20 w-20 object-cover rounded-full border-2 border-warm-stone/50"
        />
      )}

      {/* Buttons Side by Side */}
      <div className="flex gap-4">
        
        {/* "Select" Button - Styled to look like a secondary outline button */}
        <label className="
          flex items-center justify-center gap-x-2 px-5 py-2 rounded-md font-semibold
          border-2 border-warm-stone bg-transparent text-espresso-brown
          cursor-pointer transition-all duration-200
          hover:bg-warm-stone hover:text-white
        ">
          Select
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg" // More specific file types
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* "Upload" Button - Uses the primary IconBtn style */}
        <IconBtn 
          text="Upload" 
          onClick={handleUpload}
        >
          <FiUpload />
        </IconBtn>

      </div>
    </div>
  );
};

export default UpdateDisplayPicture;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateDisplayPicture } from '../../../../services/operations/authAPI';
// import IconBtn from "../../../common/IconBtn";

// const UpdateDisplayPicture = () => {
//   const dispatch = useDispatch();
//   const [imageFile, setImageFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewSource(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = () => {
//     if (!imageFile) {
//       alert("Please select an image file first.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", imageFile);
//     dispatch(updateDisplayPicture(formData));
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <label className="font-semibold">Update Profile Picture</label>

//       {/* Preview */}
//       {previewSource && (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-[100px] w-[100px] object-cover rounded-full"
//         />
//       )}

//       {/* Buttons Side by Side */}
//       <div className="flex gap-4">
//         {/* Select Button */}
//         <label className="bg-yellow-100 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-200">
//           Select
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {/* Upload Button */}
//         <IconBtn text="Upload" onClick={handleUpload} />
//       </div>
//     </div>
//   );
// };

// export default UpdateDisplayPicture;