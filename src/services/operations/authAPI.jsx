import { toast } from 'react-hot-toast';
import { setLoading, setToken } from '../../slices/authSlice';
import { resetCart } from '../../slices/CartSlice';
import { setUser } from '../../slices/ProfileSlice';
import { apiConnector } from './apiconnector';
import { endpoints } from './apis';
import { settingsEndpoints } from "./apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORD_API,
  RESETPASSTOKEN_API,
} = endpoints;
// SEND OTP
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST', SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log('SEND OTP API RESPONSE:', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('OTP sent successfully');
      console.log("Navigating to verify email...");
      navigate('/verify-email');
    } catch (error) {
      console.error('Send OTP Error:', error);
      toast.error(error.response?.data?.message || 'Could not send OTP');
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// SIGNUP
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading('Signing up...');
    dispatch(setLoading(true));

    try {
      const response = await apiConnector('POST', SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log('SIGNUP RESPONSE:', response);
       

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Signed up successfully');
      navigate('/login'); // or '/dashboard'
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// LOGIN localstorage importance for user as it sets to null after refresh
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Save token and user
      toast.success("Login Successful");

      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(
        setUser({
          ...response.data.user,
          image: userImage,
        })
      );

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error?.response?.data?.message || "Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


// LOGOUT
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    toast.success('Logged out');
    navigate('/');
  };
}

// RESET PASSWORD TOKEN
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector('POST', RESETPASSTOKEN_API, { email });
      console.log('RESET PASSWORD RESPONSE:', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Reset email sent');
      setEmailSent(true);
    } catch (error) {
      console.error('Reset password token error:', error);
      toast.error('Could not send reset email');
    
    } finally {
      dispatch(setLoading(false));
    }
  };
}


export function resetPassword(password,confirmPassword,token){
    return async (dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});

            console.log("RESET PASSWORD",response)

             if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Password has been resetted');
      

        } catch(error){
            console.error('Reset password token error:', error);
            toast.error('Could not  reset password');
        }
        dispatch(setLoading(false));
    }
}

export const updateProfile = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Parse the token

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      console.log("Token from localStorage (parsed):", token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_PROFILE_API,
        data,
        headers
      );

      console.log("Profile update response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile has been updated successfully");
      return response.data; 
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Could not update profile");
    }
    dispatch(setLoading(false));
  };
};






export const updateDisplayPicture = async (formData) => {
  const toastId = toast.loading("Uploading...");

  try {
    const token = JSON.parse(localStorage.getItem("token"));//

    const response = await apiConnector(
      "PUT",
      settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    toast.success("Profile picture updated");
    console.log("✅ Upload response:", response);
    return response;
  } catch (error) {
    console.error("❌ Upload failed:", error);
    toast.error("Failed to upload image");
  } finally {
    toast.dismiss(toastId);
  }
};





export const changePassword = (oldPassword, newPassword, confirmNewPassword) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        toast.error("You are not logged in");
        dispatch(setLoading(false));
        return { success: false, message: "Not logged in" };
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apiConnector(
        "POST",
        settingsEndpoints.CHANGE_PASSWORD_API,
        { oldPassword, newPassword, confirmNewPassword },
        headers
      );

      dispatch(setLoading(false));

      console.log("Change Password Response:", response);

      if (!response.data.success) {
        return { success: false, message: response.data.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Change password failed:", error);
      dispatch(setLoading(false));
      return { success: false, message: "Could not change password" };
    }
  };
};


export const deleteProfile = (navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apiConnector(
        "DELETE",
        settingsEndpoints.DELETE_PROFILE_API,
        null,
        headers
      );

      console.log("Delete Profile Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account deleted successfully");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.error("Delete profile failed:", error);

      // ✅ Handle expired token
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Token is invalid or expired"
      ) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser(null));
        navigate("/login");
        return;
      }

      toast.error("Could not delete profile");
    }

    dispatch(setLoading(false));
  };
};





