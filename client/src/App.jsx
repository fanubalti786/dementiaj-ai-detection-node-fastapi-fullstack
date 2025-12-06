import "quill/dist/quill.snow.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Test from "./components/Test";
import Login from "./components/admin/Login";
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Signup from "./components/admin/Signup";
import ListUsers from "./pages/admin/ListUsers";
import DementiaResult from "./pages/user/DementiaResult";
import DementiaForm from "./pages/user/DementiaForm";

// protected routes get token from local storage
const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default function App() {
  // const isLoggedIn = true;

  function NotFound() {
    return <h1>❌ Page Not Found</h1>;
  }

  function AdminNotFound() {
    return <h1>⚠️ Admin Page Not Found</h1>;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="listUsers" element={<ListUsers />} />
          <Route path="comments" element={<Comments />} />
          <Route path="dementia/submit" element={<DementiaForm />} />
          <Route path="dementia/all" element={<DementiaResult />} />
        </Route>
        {/* Normal Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard/*" element={<AdminNotFound />} />
      </Routes>
    </div>
  );
}
