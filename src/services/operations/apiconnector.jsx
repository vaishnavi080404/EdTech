// import axios from 'axios'

// export const axiosInstance =axios.create({});

// export const apiConnector =(method, url,bodyData,headers,params)=>{
//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data:bodyData?bodyData:null,
//         headers:headers?headers:null,
//         params:params?params:null,
//     });

// }

// import axios from 'axios';

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   console.log("API Connector - URL:", url); // Debug: Check the URL
//   console.log("API Connector - Headers:", headers); // Debug: Check headers
//   return axiosInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };

// import axios from "axios";

// let setModalDataGlobal;

// // ✅ Function to set the global modal handler (from App.jsx)
// export const setGlobalModalHandler = (fn) => {
//   setModalDataGlobal = fn;
// };

// export const apiConnector = async (method, url, bodyData, headers) => {
//   try {
//     const response = await axios({
//       method,
//       url,
//       data: bodyData || null,
//       headers: headers || null,
//     });
//     return response;
    
//   } catch (error) {
//     // ✅ If token expired, trigger modal instead of toast
//     if (error.response?.status === 401 && error.response?.data?.code === "TOKEN_EXPIRED") {
//       setModalDataGlobal &&
//         setModalDataGlobal({
//           text1: "Session Expired",
//           text2: "Your session has expired. Please log in again to continue.",
//           btn1: "Login",
//           btn2: "Cancel",
//           btn1Handler: () => {
//             localStorage.removeItem("token"); // clear token
//             setModalDataGlobal(null); // ✅ CLOSE MODAL (call function)
//             window.location.href = "/login"; // ✅ navigate after closing modal
//           },
//           btn2Handler: () => {
//             localStorage.removeItem("token"); // clear token
//             setModalDataGlobal(null); // ✅ CLOSE MODAL (call function)
//             window.location.href = "/"; // ✅ go home
//           },
//         });
//     }
//     throw error;
//   }
// };


import axios from "axios";

let setModalDataGlobal;

/**
 * Sets a global function to handle session expiration modals.
 * This should be called once from a top-level component like App.jsx.
 * @param {Function} fn - The function that opens the confirmation modal.
 */
export const setGlobalModalHandler = (fn) => {
  setModalDataGlobal = fn;
};

/**
 * The central API connector function for all network requests.
 * It is designed to automatically handle content types for file uploads.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT').
 * @param {string} url - The API endpoint URL.
 * @param {object} bodyData - The request body data.
 * @param {object} headers - The request headers.
 * @param {object} params - The URL parameters.
 * @returns {Promise<any>} A promise that resolves with the response from the server.
 */
export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const config = {
      method,
      url,
      data: bodyData || null,
      headers: headers || null,
      params: params || null,
    };

    // --- THIS IS THE CRITICAL FIX ---
    // If the request body is FormData (meaning a file is being uploaded),
    // we must delete any 'Content-Type' from our headers object.
    // This forces the browser to set it automatically with the correct
    // 'multipart/form-data' boundary, which is essential for file uploads.
    if (bodyData instanceof FormData) {
      if (config.headers) {
        delete config.headers["Content-Type"];
      }
    }

    const response = await axios(config);
    return response;

  } catch (error) {
    // Log the full error for easier debugging
    console.error("API Connector Error:", error.response || error);

    // If token has expired (401 Unauthorized), trigger a session expiration modal
    if (error.response?.status === 401 && error.response?.data?.code === "TOKEN_EXPIRED") {
      // Check if the global modal handler has been set
      if (setModalDataGlobal) {
        setModalDataGlobal({
          text1: "Session Expired",
          text2: "Your session has expired. Please log in again to continue.",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => {
            localStorage.removeItem("token");
            setModalDataGlobal(null); // Close the modal
            window.location.href = "/login"; // Redirect to login
          },
          btn2Handler: () => {
            localStorage.removeItem("token");
            setModalDataGlobal(null); // Close the modal
            window.location.href = "/"; // Redirect to home
          },
        });
      }
    }

    // Re-throw the error so the calling function can handle it (e.g., show a toast)
    throw error;
  }
}; 