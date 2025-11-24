import React from "react";
import 'quill/dist/quill.snow.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Test from "./components/Test";
import Login from "./components/admin/Login";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

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
        {/* Admin Routes */}
      <Route
        path="/admin"
        // element={isLoggedIn ? <Layout /> : <Login />}
        element={<Layout /> }

      >
        {/* {isLoggedIn && ( */}
          <>
            <Route index element={<Dashboard />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
            {/* Agar /admin ke andar koi unknown path ho */}
            {/* <Route path="*" element={<AdminNotFound />} /> */}
          </>
        {/* )} */}
      </Route>
      {/* Normal Routes */}
        <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/*" element={<AdminNotFound />} />

      </Routes>
    </div>
  );
}
