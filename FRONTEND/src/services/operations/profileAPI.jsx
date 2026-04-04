import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/ProfileSlice"
import { apiConnector } from "./apiconnector"
import { profileEndpoints } from "./apis"
import { logout } from "./authAPI"


const { GET_USER_DETAILS_API,
   GET_USER_ENROLLED_COURSES_API,
   GET_INSTRUCTOR_DATA_API, 
   GET_PURCHASE_HISTORY_API ,
   GET_USER_CERTIFICATES_API
  } = profileEndpoints

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}



export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = []; // Default to an empty array
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);


    if (!response?.data?.success) {
      throw new Error(response.data.message || "Could Not Get Instructor Data");
    }

    
    result = response?.data?.data;


  } catch (error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getPurchaseHistory(token) {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_PURCHASE_HISTORY_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_PURCHASE_HISTORY_API API ERROR............", error);
  }
  return result;
}

export const getMyCertificates = async (token) => {
  let result = [];
  try {
    const response = await apiConnector("GET", "/profile/my-certificates", null, {
      Authorization: `Bearer ${token}`,
    });
    if (response.data.success) {
      result = response.data.data;
    }
  } catch (error) {
    console.log("GET_MY_CERTIFICATES_API API ERROR............", error)
  }
  return result;
}

export const getUserAllCertificates = async (token) => {
    const toastId = toast.loading("Loading Certificates...");
    let result = [];
    try {
        console.log("[getUserAllCertificates] Calling backend API to fetch certificates...");
        const response = await apiConnector("GET", GET_USER_CERTIFICATES_API, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("[getUserAllCertificates] API Response:", response);

        if (!response.data.success) {
            throw new Error(response.data.message || "Could not fetch user certificates.");
        }
        result = response.data.certificates;
        toast.success("Certificates loaded successfully!");
    } catch (error) {
        console.error("[getUserAllCertificates] Error fetching user certificates:", error);
        toast.error("Could not load certificates.");
    }
    toast.dismiss(toastId);
    return result;
};