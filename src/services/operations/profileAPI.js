import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";
import axios from "axios";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
  GET_USER_DETAILS_BY_ID_API,
} = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}

// export const  fetchUserData =async(id)=> {
//     try {

//       const response = await apiConnector(
//         "GET",
//         GET_USER_DETAILS_BY_ID_API,
//         id
//       );

//       console.log("GET_USER_DETAILS API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }
//      return response;
//     } catch (error) {
//       console.log("Mai andar hu")
//       console.log("GET_USER_DETAILS_BY_ID_API............", error);
//       toast.error("Could Not Get User Details By Id");
//     }

// }

//  export const fetchUserData = async (userId) => {
//   try {
//     console.log("mai yaha hu useid-->",userId)
//     const response = await axios.get(GET_USER_DETAILS_BY_ID_API, { data: { id: userId } });
//     console.log("response--->>",response)
//     return response;
//     // setUserDetails(response.data.existingUser);
//   } catch (error) {
//     // setError(error.response.data.message);
//     console.log("error.response.data.message")
//   }
// };

export const fetchUserData = async (userId) => {
  try {
    console.log("userId-->", userId);
    const response = await axios.post(GET_USER_DETAILS_BY_ID_API, {
      id: userId,
    });
    console.log("response--->>", response.data.existingUser);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
