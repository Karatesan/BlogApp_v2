import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import Images from "./Images";
import CreateBlogPost from "./CreateBlogPost";
import HomeCarousel from "./HomeCarousel";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getBlogPosts = async () => {
      const response = await fetch("/api/blogpost");
      const posts = await response.json();
      setBlogPosts(posts);
    };
    setLoadingData(true);
    getBlogPosts().finally(() => {
      setLoadingData(false);
    });
  }, []);

  return (
    <>
      <HomeCarousel posts={blogPosts} key={loadingData} />
      <CreateBlogPost />
      
    </>
  );
};

export default Home;
