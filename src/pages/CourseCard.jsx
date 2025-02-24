import React, { useEffect, useState } from "react";
import { courseService } from "../services/CourseAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  const fetchData = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching courses."
      );
    }
  };

  const enrollCourse = async (courseId) => {
    try {
      setEnrollingCourseId(courseId);
      const response = await courseService.enrollCourse(courseId);
      toast.success(response.message);

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? {
                ...course,
                enrolledUsers: [
                  ...(course.enrolledUsers || []),
                  { user: "currentUser", enrollStatus: "Enrolled" },
                ],
              }
            : course
        )
      );
    } catch (error) {
      toast.error(error.message || "An error occurred while enrolling.");
    } finally {
      setEnrollingCourseId(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-10 py-20">
      <div className="text-gray-900 flex justify-center py-10 text-4xl">
        <h1>All Course's</h1>
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
                {item.video?.[0]?.videoUrl ? (
                  <video controls className="w-full h-48 object-cover rounded">
                    <source src={item.video[0].videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={item.banner}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <div className="p-5 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </p>
                  <div className="flex justify-between">
                    {isEnrolled ? (
                      <span className="inline-block px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg">
                        Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={() => enrollCourse(item._id)}
                        disabled={enrollingCourseId === item._id}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg ${
                          enrollingCourseId === item._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {enrollingCourseId === item._id
                          ? "Enrolling..."
                          : "Enroll in Course"}
                      </button>
                    )}
                    <Link to={`/course/details/${item._id}`}>
                      <button
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg 
                        bg-blue-600 hover:bg-blue-700 "
                      >
                        Get Details
                      </button>
                    </Link>
                  </div>
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

export default CourseCard;
