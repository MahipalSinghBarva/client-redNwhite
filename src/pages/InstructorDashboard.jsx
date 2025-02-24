import React, { useEffect, useState } from "react";
import { courseService } from "../services/CourseAPI";
import { toast } from "react-toastify";
import uploadImageToImageKit from "../utils/imageKitSService";

const InstructorDashboard = () => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    author: "",
    banner: null,
    assignments: [],
    video: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch courses.");
    }
  };

  const handlePopOpen = () => setIsPopOpen(true);
  const handlePopClose = () => {
    setIsPopOpen(false);
    setFormData({
      name: "",
      description: "",
      author: "",
      banner: null,
      assignments: [],
      video: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerChange = (e) => {
    setFormData((prev) => ({ ...prev, banner: e.target.files[0] }));
  };

  const handleAddAssignment = () => {
    setFormData((prev) => ({
      ...prev,
      assignments: [
        ...prev.assignments,
        { title: "", description: "", dueDate: "", file: null },
      ],
    }));
  };

  const handleAssignmentChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedAssignments = [...formData.assignments];
    updatedAssignments[index][name] = files ? files[0] : value;
    setFormData((prev) => ({ ...prev, assignments: updatedAssignments }));
  };

  const handleAddVideo = () => {
    setFormData((prev) => ({
      ...prev,
      video: [...prev.video, { title: "", content: "", file: null }],
    }));
  };

  const handleVideoChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedVideos = [...formData.video];
    updatedVideos[index][name] = files ? files[0] : value;
    setFormData((prev) => ({ ...prev, video: updatedVideos }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedBannerURL = formData.banner
        ? await uploadImageToImageKit(formData.banner)
        : null;

      const uploadedAssignments = await Promise.all(
        formData.assignments.map(async (assignment) => ({
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          assignmentUrl: assignment.file
            ? await uploadImageToImageKit(assignment.file)
            : "",
        }))
      );

      const uploadedVideos = await Promise.all(
        formData.video.map(async (vid) => ({
          title: vid.title,
          content: vid.content,
          videoUrl: vid.file ? await uploadImageToImageKit(vid.file) : "",
        }))
      );

      const payload = {
        name: formData.name,
        description: formData.description,
        author: formData.author,
        banner: uploadedBannerURL,
        assignments: uploadedAssignments,
        video: uploadedVideos,
      };

      const response = await courseService.createCourses(payload);
      toast.success(response.message || "Course created successfully!");
      fetchData();
      handlePopClose();
    } catch (error) {
      toast.error(error.message || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="relative">
      {isPopOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      <div
        className={`${
          isPopOpen ? "blur-sm pointer-events-none" : ""
        } p-6 relative z-10`}
      >
        <div className="flex gap-5 items-center justify-center">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border rounded-lg bg-gray-50"
            placeholder="Search by course name or author..."
          />
          <button
            onClick={handlePopOpen}
            className="bg-blue-700 text-white rounded-lg px-5 py-2"
          >
            + Add Course
          </button>
        </div>

        <h1 className="text-3xl text-center py-10 font-bold">All Courses</h1>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                {course.video?.[0]?.videoUrl ? (
                  <video controls className="w-full h-48 object-cover rounded">
                    <source src={course.video[0].videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={course.banner}
                    alt={course.name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h3 className="mt-2 text-lg font-semibold">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.author}</p>
                <p className="mt-2">{course.description.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-10">No courses found.</p>
        )}
      </div>

      {isPopOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] max-h-[90%] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Create New Course</h2>
              <button
                onClick={handlePopClose}
                className="text-red-500 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Course Title"
                className="w-full p-3 border rounded"
              />

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full p-3 border rounded"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Course Description"
                className="w-full p-3 border rounded"
              />

              <div>
                <label className="font-medium">Upload Course Banner</label>
                <input
                  type="file"
                  onChange={handleBannerChange}
                  className="block w-full mt-2 p-2 border rounded"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold">Assignments</h4>
                {formData.assignments.map((assignment, idx) => (
                  <div key={idx} className="border p-3 rounded mb-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Assignment Title"
                      value={assignment.title}
                      onChange={(e) => handleAssignmentChange(idx, e)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      name="description"
                      placeholder="Assignment Description"
                      value={assignment.description}
                      onChange={(e) => handleAssignmentChange(idx, e)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="date"
                      name="dueDate"
                      value={assignment.dueDate}
                      onChange={(e) => handleAssignmentChange(idx, e)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => handleAssignmentChange(idx, e)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAssignment}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  + Add Assignment
                </button>
              </div>

              <div>
                <h4 className="text-lg font-semibold">Videos</h4>
                {formData.video.map((vid, idx) => (
                  <div key={idx} className="border p-3 rounded mb-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Video Title"
                      value={vid.title}
                      onChange={(e) => handleVideoChange(idx, e)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      name="content"
                      placeholder="Video Content Description"
                      value={vid.content}
                      onChange={(e) => handleVideoChange(idx, e)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => handleVideoChange(idx, e)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  + Add Video
                </button>
              </div>

              <button
                type="submit"
                className={`w-full py-2 text-white rounded ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
