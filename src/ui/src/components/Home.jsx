import React, { useEffect, useState, useRef } from "react";
import ImageUploader from "./ImageUploader";
import Images from "./Images";
import CreateBlogPost from "./CreateBlogPost";
import HomeCarousel from "./HomeCarousel";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import BlogPostcCard from "./BlogPostcCard";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const rowRef = useRef(1);

  useEffect(() => {
    const getBlogPosts = async () => {
      const response = await fetch("/api/blogpost/basic");
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
      <HomeCarousel posts={blogPosts} />
      <div className="grid md:grid-cols-2 grid-cols-1">
        {blogPosts.map((post, index) => {
          const row = index % 2 === 1 ? rowRef.current++ : rowRef.current;
          return (
            <Link key={post.id} to={`/blog/${post.id}`}>
            <div  className="card-container">
              <BlogPostcCard post={post} row={row} />
            </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
