import axios from "axios";
import { baseURL } from "./baseURL";

export const userService = {
  register: async (form) => {
    const response = await axios.post(`${baseURL}/api/v1/register`, form, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response.data;
  },

  login: async (form) => {
    const response = await axios.post(`${baseURL}/api/v1/login`, form, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  },

  updateProfile: async (formData) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/v1/update`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "API error occurred.");
    }
  },
};
