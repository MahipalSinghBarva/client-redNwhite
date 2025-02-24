import axios from "axios";
import { baseURL, token } from "./baseURL";

export const courseService = {
  getAllCourses: async () => {
    const response = await axios.get(`${baseURL}/api/v1/course/getall`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // console.log(response.data.data);
    return response.data.data;
  },

  getCourseById: async (id) => {
    const response = await axios.get(`${baseURL}/api/v1/course/get/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // console.log(response.data.data);
    return response.data.data;
  },

  getEnrollCourses: async () => {
    const response = await axios.get(`${baseURL}/api/v1/enrollment`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // console.log(response.data.data);
    return response.data;
  },

  enrollCourse: async (courseId) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/enrollment/enroll`,
        { courseId },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Enrollment error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to enroll in course."
      );
    }
  },

  getEnrollmentByCourseId: async (courseId) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/enrollment/progress/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching enrollment:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch enrollment."
      );
    }
  },

  createCourses: async (payload) => {
    try {
      console.log("Creating course with data:", payload);

      const response = await axios.post(
        `${baseURL}/api/v1/course/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          withCredentials: true,
        }
      );

      //   console.log("Course creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating course:",
        error.response?.data || error.message
      );

      if (error.response) {
        throw new Error(
          error.response.data?.message || "Failed to create course."
        );
      } else if (error.request) {
        throw new Error(
          "No response from server. Please check your connection."
        );
      } else {
        throw new Error(
          "An unexpected error occurred while creating the course."
        );
      }
    }
  },

  updateProgress: async (enrollmentId, progress) => {
    const response = await axios.put(
      `${baseURL}/api/v1/enrollment/progress`,
      { enrollmentId, progress },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  },
};
