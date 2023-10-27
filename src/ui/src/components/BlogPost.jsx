import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const BlogPost = () => {
  const params = useParams();
  const id = params.postId;
  const [post, setPost] = useState("");

  useEffect(() => {
    const getPostById = async () => {
      const response = await fetch(`/api/blogpost/${id}`);
      const post = await response.json();
      const postData = {
        id: post.id,
        author: post.author,
        title: post.title,
        content: post.content,
        blogDate: post.blogDate,
        updateDate: post.updateBlogDate,
        poster: post.poster,
        rating: post.rating,
        images: post.gallery, //base64 string
        comments: post.comments,
      };
      setPost(postData);
    };
    getPostById();
  }, [id]);
  return (
    <>
      <div className="w-[70%]"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      ></div>
      <p>{post.id}</p>
    </>
  );
};

export default BlogPost;
