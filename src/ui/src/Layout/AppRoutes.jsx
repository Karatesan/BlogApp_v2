import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../components/Home";
import UpdatePost from "../components/UpdatePost";
import CreateBlogPost from "../components/CreateBlogPost";
import BlogPost from "../components/BlogPost";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/UpdatePost/:postId" element={<UpdatePost />}></Route>
          <Route path="/CreateNewPost" element={<CreateBlogPost />}></Route>
          <Route path="/blog/:postId" element ={<BlogPost />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
