import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseCard from "./pages/CourseCard";
import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Footer from "./component/Footer";
import ProfileDashboard from "./pages/Profile/ProfileDasboard";
import CourseDetails from "./pages/CourseDetails";

// import { useEffect } from "react";

const AppContent = () => {
  // const {  loading } = useUser();
  const location = useLocation();

  // useEffect(() => {
  //   console.log("Current path:", location.pathname);
  // }, [location]);

  // if (loading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );

  return (
    <>
      {/* 🧭 Show Navbar only if NOT on login/register pages */}
      {!["/login", "/register"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* Student Routes */}
        <Route path="/" element={<CourseCard />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={ProfileDashboard}
              allowedRoles={["student", "instructor"]}
            />
          }
        />
        <Route
          path="/course/details/:id"
          element={
            <ProtectedRoute
              element={CourseDetails}
              allowedRoles={["student", "instructor"]}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={Dashboard} allowedRoles={["student"]} />
          }
        />

        {/* Instructor Routes */}
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute
              element={InstructorDashboard}
              allowedRoles={["instructor"]}
            />
          }
        />
      </Routes>

      <Footer />
      <ToastContainer position="top-center" theme="dark" />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
