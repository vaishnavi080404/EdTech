// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
// import IconBtn from "../../common/IconBtn";
// import Spinner from "../../common/Spinner"; // Using a consistent loading spinner

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const playerRef = useRef(null); // Use a more descriptive name for the video ref
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } = useSelector(
//     (state) => state.viewCourse
//   );

//   const [videoData, setVideoData] = useState(null);
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // This effect finds the current video data from the Redux store
//   useEffect(() => {
//     const setVideoSpecificDetails = () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate("/dashboard/enrolled-courses");
//         return;
//       }

//       const filteredSection = courseSectionData.find(
//         (course) => course._id === sectionId
//       );
//       const filteredVideo = filteredSection?.subSection.find(
//         (data) => data._id === subSectionId
//       );

//       if (filteredVideo) {
//         setVideoData(filteredVideo);
//         setVideoEnded(false); // Reset the ended state for the new video
//       }
//     };
//     setVideoSpecificDetails();
//   }, [courseSectionData, courseEntireData, location.pathname, navigate, courseId, sectionId, subSectionId]);


//   // --- THIS IS THE CORE LOGIC ---
//   // This function is called automatically by the video player's onEnded event.
//   const handleVideoEnd = async () => {
//     console.log("Video ended. Checking completion status...");
//     setVideoEnded(true);

//     // 1. Check if this lecture is already in the completed list. If so, do nothing.
//     if (completedLectures.includes(subSectionId)) {
//       console.log("Lecture already marked as complete.");
//       return;
//     }

//     // 2. If not completed, call the API to mark it as complete.
//     setLoading(true);
//     const result = await markLectureAsComplete(
//       { courseId: courseId, subSectionId: subSectionId },
//       token
//     );
//     if (result) {
//       // 3. If the API call is successful, update the Redux state.
//       dispatch(updateCompletedLectures(subSectionId));
//     }
//     setLoading(false);
//   };


//   // --- Utility functions for navigation ---
//   const isFirstVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
//     return currentSectionIndex === 0 && currentSubSectionIndex === 0;
//   };

//   const isLastVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;
//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === noOfSubSections - 1
//     );
//   };

//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection.length;
//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
//     if (currentSubSectionIndex !== noOfSubSections - 1) {
//       const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//       const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//       navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
//     }
//   };

//   const goToPrevVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
//     if (currentSubSectionIndex !== 0) {
//       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//       const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//       const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//       navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
//     }
//   };

//   // Function for the "Rewatch" button
//   const handleRewatch = () => {
//     if (playerRef.current) {
//       playerRef.current.currentTime = 0;
//       playerRef.current.play();
//       setVideoEnded(false);
//     }
//   };

//   // Render a spinner while video data is being loaded
//   if (loading || !videoData) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <Spinner />
//       </div>
//     )
//   }
  
//   return (
//     <div className="flex flex-col gap-5 text-white p-4">
//       <div className="relative w-full aspect-video">
//         <video
//           ref={playerRef}
//           src={videoData?.videoUrl}
//           controls
//           playsInline
//           onEnded={handleVideoEnd} // Automatically call our logic when the video finishes
//           className="w-full h-full rounded-xl shadow-lg"
//         />

//         {/* --- REIMAGINED VIDEO END OVERLAY --- */}
//         {videoEnded && (
//           <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-center">
            
//             {/* The "Mark As Completed" button has been removed for a smoother UX */}

//             <IconBtn
//               disabled={loading}
//               onClick={handleRewatch}
//               text="Rewatch"
//               customClasses="text-lg max-w-max px-6"
//             />
            
//             <div className="mt-6 flex flex-wrap justify-center gap-4 text-base sm:text-lg">
//               {!isFirstVideo() && (
//                 <button
//                   disabled={loading}
//                   onClick={goToPrevVideo}
//                   className="bg-warm-stone text-white px-5 py-2 rounded-md font-semibold transition-all duration-200 hover:bg-warm-stone/80"
//                 >
//                   &larr; Prev
//                 </button>
//               )}
//               {!isLastVideo() && (
//                 <IconBtn
//                   disabled={loading}
//                   onClick={goToNextVideo}
//                   text="Next"
//                   customClasses="px-5" // Using IconBtn for the primary navigation action
//                 >
//                   &rarr;
//                 </IconBtn>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- Title + Description --- */}
//       <h1 className="mt-2 text-3xl font-bold">{videoData?.title}</h1>
//       <p className="text-base text-soft-terracotta/80 leading-relaxed">
//         {videoData?.description}
//       </p>
//     </div>
//   );
// };

// export default VideoDetails;


import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from '../../common/IconBtn';

// No need for 'video-react' imports anymore!

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const videoRef = useRef(null); // Use a standard ref for the video element
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState(null); // Initialize with null
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewSource, setPreviewSource] = useState("");

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length) return;
            if (!courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses");
                return;
            }

            const filteredSection = courseSectionData.find((course) => course._id === sectionId);
            const filteredVideo = filteredSection?.subSection.find((data) => data._id === subSectionId);

            if (filteredVideo) {
                setVideoData(filteredVideo);
                setPreviewSource(courseEntireData.thumbnail);
                setVideoEnded(false);
            }
        };
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

    // ... (isFirstVideo, isLastVideo, goToNextVideo, goToPrevVideo, handleLectureCompletion functions remain the same) ...

    const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
        return true;
    }
    else {
        return false;
    }
  } 

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1 &&
        currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        }
    else {
        return false;
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSections - 1) {
        //same section ki next video me jao
        const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
        //next video pr jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
        //different section ki first video
        const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
        const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
        ///iss voide par jao 
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== 0 ) {
        //same section , prev video
        const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
        //iss video par chalge jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
        //different section , last video
        const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
        const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
        const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id
        //iss video par chalge jao
        navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }
  }

  const handleLectureCompletion = async() => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    //state update
    if(res) {
        dispatch(updateCompletedLectures(subSectionId)); 
    }
    setLoading(false);
  }

    return (
            <div className="flex flex-col gap-5 text-white">
        {!videoData ? (
            // --- THIS IS THE FIX ---
            // Only render the image if previewSource is not an empty string
            previewSource && (
                <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                />
            )
            // --- END OF FIX ---
        ) : (
                <div className="relative">
                    <video
                        ref={videoRef}
                        src={videoData?.videoUrl}
                        controls
                        playsInline
                        onEnded={() => setVideoEnded(true)}
                        className="w-full aspect-video"
                    />

                    {videoEnded && (
                        <div
                            style={{ backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)" }}
                            className="absolute inset-0 z-10 grid h-full place-content-center font-inter"
                        >
                            {!completedLectures.includes(subSectionId) && (
                                <IconBtn
                                    disabled={loading}
                                    onClick={handleLectureCompletion}
                                    text={!loading ? "Mark As Completed" : "Loading..."}
                                    customClasses="text-xl max-w-max px-4 mx-auto"
                                />
                            )}
                            <IconBtn
                                disabled={loading}
                                onClick={() => {
                                    if (videoRef.current) {
                                        videoRef.current.currentTime = 0;
                                        videoRef.current.play();
                                        setVideoEnded(false);
                                    }
                                }}
                                text="Rewatch"
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                            />
                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                {!isFirstVideo() && (
                                    <button disabled={loading} onClick={goToPrevVideo} className='blackButton'>
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button disabled={loading} onClick={goToNextVideo} className='blackButton'>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
            <p className="pt-2 pb-6">{videoData?.description}</p>
        </div>
    );
};

export default VideoDetails;