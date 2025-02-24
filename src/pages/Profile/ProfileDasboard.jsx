import React, { useEffect, useState } from "react";
import { userService } from "../../services/UserAPI";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

const ProfileDashboard = () => {
  const { user, login, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.updateProfile(formData);

      if (response?.success) {
        const { user } = response; // ✅ Get user from response

        if (user) {
          setUser(user); // ✅ Update context to prevent logout
          localStorage.setItem("user", JSON.stringify(user)); // ✅ Update localStorage
          toast.success("Profile updated successfully!");
          setEditMode(false);
        } else {
          toast.error("No user data returned. Please try again.");
        }
      } else {
        toast.error(response?.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16 h-[67vh]">
      <h2 className="text-3xl font-semibold mb-6 text-center">My Profile</h2>
      {user ? (
        !editMode ? (
          <div>
            <p>
              <strong>Name:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileDashboard;
