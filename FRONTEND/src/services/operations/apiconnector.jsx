import axios from "axios";

let setModalDataGlobal;

/**

 * @param {Function} fn - The function that opens the confirmation modal.
 */
export const setGlobalModalHandler = (fn) => {
  setModalDataGlobal = fn;
};

/**

 * @param {string} method 
 * @param {string} url 
 * @param {object} bodyData 
 * @param {object} headers 
 * @returns {Promise<any>} 
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


    // 'multipart/form-data' boundary, which is essential for file uploads.
    if (bodyData instanceof FormData) {
      if (config.headers) {
        delete config.headers["Content-Type"];
      }
    }

    const response = await axios(config);
    return response;

  } catch (error) {
    
    console.error("API Connector Error:", error.response || error);

   
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
            setModalDataGlobal(null); 
            window.location.href = "/login"; // redirect to login
          },
          btn2Handler: () => {
            localStorage.removeItem("token");
            setModalDataGlobal(null); 
            window.location.href = "/"; 
          },
        });
      }
    }


    throw error;
  }
}; 