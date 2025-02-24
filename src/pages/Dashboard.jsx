import React, { useEffect, useState } from "react";
import { courseService } from "../services/CourseAPI";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourseId, setLoadingCourseId] = useState(null); 

  const fetchData = async () => {
    try {
      const data = await courseService.getEnrollCourses();
      setCourses(data.enrolledCourses);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching courses."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    setLoadingCourseId(courseId);
    try {
      await courseService.enrollCourse(courseId);
      toast.success("Successfully enrolled!");
      fetchData(); 
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during enrollment."
      );
    } finally {
      setLoadingCourseId(null); 
    }
  };

  return (
    <div className="px-10 py-20">
      <div className="text-gray-900 flex justify-center py-10 text-4xl">
        <h1 >All Enrolled Course's</h1>
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((item) => {
            const isEnrolled = item.enrolledUsers?.some(
              (enrollment) => enrollment.enrollStatus === "Enrolled"
            );

            return (
              <div
                className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition duration-200"
                key={item._id}
              >
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={
                    item.banner ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.name}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </p>

                  {isEnrolled ? (
                    <span className="inline-block px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg">
                      Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(item._id)}
                      disabled={loadingCourseId === item._id}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg ${
                        loadingCourseId === item._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {loadingCourseId === item._id ? "Enrolling..." : "Enroll"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-lg font-medium">No courses available.</p>
      )}
    </div>
  );
};

export default Dashboard;
