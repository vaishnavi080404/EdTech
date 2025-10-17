
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(editData || "")

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        setSelectedFile(file)
        handlePreview(file)
      }
    },
    noClick: true,
    noKeyboard: true,
  })

  const handlePreview = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => setPreviewSource(reader.result)
    } else if (file.type.startsWith("video/")) {
      const videoURL = URL.createObjectURL(file)
      setPreviewSource(videoURL)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, name, setValue])

  useEffect(() => {
    return () => {
      if (previewSource && previewSource.startsWith("blob:")) {
        URL.revokeObjectURL(previewSource)
      }
    }
  }, [previewSource])

  return (
    <div className="flex flex-col space-y-2">
      {/* ✅ Label */}
      <label className="text-sm font-medium text-espresso-brown">
        {label} <sup className="text-pink-400">*</sup>
      </label>

      {/* 📦 Dropzone */}
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 min-h-[260px] p-6 ${
          isDragActive
            ? "border-espresso-brown bg-soft-terracotta/40"
            : "border-warm-stone/30 bg-white/70"
        }`}
      >
        {previewSource ? (
          <div className="w-full flex flex-col items-center">
            {/* ✅ Preview */}
            {selectedFile?.type?.startsWith("image/") ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-56 w-full rounded-lg object-cover shadow-sm"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="h-56 w-full rounded-lg shadow-sm"
              />
            )}

            {/* 📄 File Name */}
            <p className="mt-3 text-sm text-espresso-brown">
              <span className="font-semibold text-soft-terracotta">
                {selectedFile?.name}
              </span>{" "}
              ({(selectedFile?.size / (1024 * 1024)).toFixed(1)} MB)
            </p>

            {/* ❌ Remove File */}
            <button
              type="button"
              onClick={() => {
                setPreviewSource("")
                setSelectedFile(null)
                setValue(name, null)
              }}
              className="mt-3 rounded-md border border-pink-400 px-4 py-1 text-sm font-medium text-pink-400 hover:bg-pink-400 hover:text-white transition-all duration-200"
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            {/* 📂 Upload Icon */}
            <div className="grid h-16 w-16 place-items-center rounded-full bg-soft-terracotta/30 shadow-md">
              <FiUploadCloud className="text-3xl text-espresso-brown" />
            </div>

            {/* 📝 Instructions */}
            <p className="mt-4 text-espresso-brown text-sm max-w-[250px]">
              Drag & drop an <b>image</b> or <b>video</b> here, or
            </p>

            {/* 📁 Browse Button */}
            <button
              type="button"
              onClick={open}
              className="mt-3 rounded-md bg-espresso-brown px-5 py-2 text-sm font-semibold text-white hover:bg-espresso-brown/90 transition-all duration-200"
            >
              Browse File
            </button>

            {/* ✅ File Guidelines */}
            <p className="mt-4 text-xs text-warm-stone">
              ✅ Recommended: 16:9 ratio
            </p>
          </div>
        )}
        <input {...getInputProps()} />
      </div>

      {/* ❌ Error message */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-400">
          {label} is required
        </span>
      )}
    </div>
  )
}


// import { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import ReactPlayer from "react-player";

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   viewData = null,
//   editData = null,
// }) {
//   const { course } = useSelector((state) => state.course);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   );

//   // ✅ useDropzone setup
//   const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
//     accept: { "image/*": [], "video/*": [] },
//     multiple: false, // only allow one file
//     noClick: true,   // we'll trigger click manually
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         handlePreview(file);
//         setSelectedFile(file);
//       }
//     },
//   });

//   // ✅ handle preview (image → base64, video → blob URL)
//   const handlePreview = (file) => {
//     if (file.type.startsWith("image/")) {
//       // ✅ For images: use FileReader
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setPreviewSource(reader.result);
//       };
//     } else if (file.type.startsWith("video/")) {
//       // ✅ For videos: use blob URL
//       const videoURL = URL.createObjectURL(file);
//       setPreviewSource(videoURL);
//     }
//   };

//   // ✅ Register field with react-hook-form
//   useEffect(() => {
//     register(name, { required: true });
//   }, [register, name]);

//   // ✅ Send selected file to react-hook-form
//   useEffect(() => {
//     setValue(name, selectedFile);
//   }, [selectedFile, name, setValue]);

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5">
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>

//       <div
//         {...getRootProps()}
//         className={`${
//           isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//         } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//       >
//         {/* ✅ Hidden input */}
//         <input {...getInputProps()} />

//         {/* ✅ Preview file (image or video) */}
//         {previewSource ? (
//           <div className="flex w-full flex-col p-6">
//             {selectedFile?.type?.startsWith("image/") ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="h-full w-full rounded-md object-cover"
//               />
//             ) : (
//               <ReactPlayer url={previewSource} controls width="100%" height="300px" />
//             )}
//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewSource("");
//                   setSelectedFile(null);
//                   setValue(name, null);
//                 }}
//                 className="mt-3 text-richblack-400 underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           // ✅ Drag-and-drop box
//           <div
//             className="flex w-full flex-col items-center p-6"
//             onClick={open} // ✅ click opens file explorer
//           >
//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//               <FiUploadCloud className="text-2xl text-yellow-50" />
//             </div>
//             <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//               Drag and drop an <b>image or video</b>, or click to{" "}
//               <span className="font-semibold text-yellow-50">browse</span>
//             </p>
//             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* ✅ Validation error */}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   editData = null,
// }) {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(editData || "")

//   const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
//     accept: { "image/*": [], "video/*": [] },
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0]
//       if (file) {
//         setSelectedFile(file)
//         handlePreview(file)
//       }
//     },
//     noClick: true,
//     noKeyboard: true,
//   })

//   const handlePreview = (file) => {
//     if (file.type.startsWith("image/")) {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onloadend = () => setPreviewSource(reader.result)
//     } else if (file.type.startsWith("video/")) {
//       const videoURL = URL.createObjectURL(file)
//       setPreviewSource(videoURL)
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//   }, [register, name])

//   useEffect(() => {
//     setValue(name, selectedFile)
//   }, [selectedFile, name, setValue])

//   useEffect(() => {
//     return () => {
//       if (previewSource && previewSource.startsWith("blob:")) {
//         URL.revokeObjectURL(previewSource)
//       }
//     }
//   }, [previewSource])

//   return (
//     <div className="flex flex-col space-y-2">
//       {/* ✅ Label */}
//       <label className="text-sm font-medium text-gray-100">
//         {label} <sup className="text-pink-300">*</sup>
//       </label>

//       {/* 📦 Dropzone */}
//       <div
//         {...getRootProps()}
//         className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 ${
//           isDragActive
//             ? "border-yellow-400 bg-gray-700"
//             : "border-gray-500 bg-gray-800"
//         } min-h-[260px] p-6`}
//       >
//         {previewSource ? (
//           <div className="w-full flex flex-col items-center">
//             {/* ✅ Preview */}
//             {selectedFile?.type?.startsWith("image/") ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="h-56 w-full rounded-lg object-cover shadow-md"
//               />
//             ) : (
//               <video
//                 src={previewSource}
//                 controls
//                 className="h-56 w-full rounded-lg shadow-md"
//               />
//             )}

//             {/* 📄 File Name */}
//             <p className="mt-3 text-sm text-gray-300">
//               <span className="font-semibold text-yellow-300">
//                 {selectedFile?.name}
//               </span>{" "}
//               ({(selectedFile?.size / (1024 * 1024)).toFixed(1)} MB)
//             </p>

//             {/* ❌ Remove File */}
//             <button
//               type="button"
//               onClick={() => {
//                 setPreviewSource("")
//                 setSelectedFile(null)
//                 setValue(name, null)
//               }}
//               className="mt-3 rounded-md border border-red-400 px-4 py-1 text-sm font-medium text-red-400 hover:bg-red-400 hover:text-white transition-all duration-200"
//             >
//               Remove File
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center text-center">
//             {/* 📂 Upload Icon */}
//             <div className="grid h-16 w-16 place-items-center rounded-full bg-gray-700 shadow-md">
//               <FiUploadCloud className="text-3xl text-yellow-400" />
//             </div>

//             {/* 📝 Instructions */}
//             <p className="mt-4 text-gray-300 text-sm max-w-[250px]">
//               Drag & drop an <b>image</b> or <b>video</b> here, or
//             </p>

//             {/* 📁 Browse Button */}
//             <button
//               type="button"
//               onClick={open}
//               className="mt-3 rounded-md bg-yellow-400 px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-500 transition-all duration-200"
//             >
//               Browse File
//             </button>

//             {/* ✅ File Guidelines */}
            
              
//               <p className="mt-4 text-xs text-gray-400 space-y-1" >✅ Recommended: 16:9 ratio</p>
            
//           </div>
//         )}
//         <input {...getInputProps()} />
//       </div>

//       {/* ❌ Error message */}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-300">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
//}