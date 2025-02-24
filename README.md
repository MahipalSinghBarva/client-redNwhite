eLearning Platform - Full Stack Application

A fully-featured eLearning platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse courses, enroll, complete assignments, track progress, and much more. The platform supports user roles (Student, Instructor), real-time updates, and robust authentication.

🚀 Features

✅ Student Features:

Browse and search for courses 🔍

Enroll in available courses 📥

Track progress with a progress bar 📊

Complete and submit assignments 📝

Watch course videos 🎥

View profile and update details 🧑‍💻

🧑‍🏫 Instructor Features:

Create new courses with banners, videos, and assignments ➕

Manage enrolled students 🧑‍🤝‍🧑

Update course details ✏️

Track student progress 📈

🔐 Authentication:

Secure JWT-based authentication 🔑

Role-based access (Student/Instructor) 🛡️

Session management with cookies 🍪

🏗️ Project Structure

📂 Client (React Frontend)

/src
├── components/        # Reusable components (Navbar, Footer, CourseCard)
├── pages/             # Pages (Home, Dashboard, CourseDetails, Profile)
├── context/           # Global state management (UserContext)
├── services/          # API service calls (userService, courseService)
├── utils/             # Utility functions (Image upload to ImageKit)
├── App.js             # Main routing and application entry
└── index.js           # React entry point

📂 Server (Node.js Backend)

/server
├── controllers/       # Route controllers (courses, users, enrollments)
├── models/            # MongoDB models (User, Course, Enrollment)
├── routes/            # Express routes (API endpoints)
├── middleware/        # Authentication & error handling
├── config/            # DB connections and environment configs
└── server.js          # Main server entry point

🛠️ Technologies Used

Frontend 🖥️

React.js

React Router DOM

Axios (API calls)

Tailwind CSS & Custom CSS (Responsive design)

Toastify (Notifications)

Backend ⚙️

Node.js + Express.js

MongoDB + Mongoose (Database)

JWT for Authentication

Multer + ImageKit for file uploads

CORS & Cookie Parser for session handling

🚦 Installation & Setup

🖥️ Client Setup:

cd client
npm install
npm start   # Runs on http://localhost:3000

🗄️ Server Setup:

cd server
npm install
npm run dev  # Runs on http://localhost:5000

Create a .env file in the server/ folder with:

PORT=5000
MONGODB_URI=your_mongo_db_connection
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint

📝 Key Functionalities

📄 Course Management:

Instructors can add courses with:

Title, Description, Author Name

Banner image (uploaded via ImageKit)

Assignments (with files and due dates)

Multiple videos per course

Students can:

Enroll and track course progress

See enrollment status: Enrolled, Completed, Dropped

Complete assignments and view progress bars

📊 Progress Tracking:

Updates in real-time as videos are watched and assignments are completed.

Progress stored and updated in the database.

🚀 Deployment

Client: Deployed on Netlify

Server: Hosted on Render or Heroku

Database: MongoDB Atlas

🖼️ Screenshots

🏠 Homepage: Browse courses with videos and banners.

📚 Dashboard: View enrolled courses and progress.

📝 Profile Page: Update user details and see account info.

🧑‍🏫 Instructor Dashboard: Add and manage courses.

🧩 API Endpoints

📁 Auth Routes

POST /api/v1/login - Login user

POST /api/v1/register - Register user

GET /api/v1/me - Get profile details

📁 Course Routes

GET /api/v1/course/getall - Fetch all courses

GET /api/v1/course/get/:id - Get course by ID

POST /api/v1/course/create - Create a new course (Instructor only)

📁 Enrollment Routes

POST /api/v1/enrollment/enroll - Enroll in a course (Student only)

PUT /api/v1/enrollment/progress - Update course progress

GET /api/v1/enrollment - Get enrolled courses

🙌 Contributors

👨‍💻 Mahipal Singh

📧 Email: mahipalsingh450@gmail.com

⚡ Final Notes:

✅ Fully responsive for mobile, tablet, and desktop views.✅ Smooth login/logout flows with protected routes.✅ Real-time updates for course progress and enrollment statuses.✅ Highly scalable and easy to maintain.