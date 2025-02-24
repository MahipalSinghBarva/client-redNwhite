// CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseService } from "../services/CourseAPI";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading course details...</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-20">
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Author:</strong> {course.author}
      </p>
      <p className="text-gray-600 mb-6">
        <strong>Description:</strong> {course.description}
      </p>

      {course.banner && (
        <img
          src={course.banner}
          alt="Course Banner"
          className="w-full h-60 object-cover rounded-lg mb-6"
        />
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        {course.video?.length > 0 ? (
          <ul className="space-y-4">
            {course.video.map((video, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <h3 className="font-medium text-lg">{video.title}</h3>
                {video.videoUrl ? (
                  <video controls className="w-full rounded mt-2">
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-red-500">Video not available</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos available for this course.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
        {course.assignments?.length > 0 ? (
          <ul className="space-y-4">
            {course.assignments.map((assignment, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <h3 className="font-medium text-lg">{assignment.title}</h3>
                {assignment.assignmentUrl ? (
                  <a
                    href={assignment.assignmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download Assignment
                  </a>
                ) : (
                  <p className="text-red-500">Assignment not available</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments available for this course.</p>
        )}
      </section>
    </div>
  );
};

export default CourseDetails;
