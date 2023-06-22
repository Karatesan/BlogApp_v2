import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "./ImageUploader";

const initialData = {
  id: "",
  title: "",
  content: "",
  blogDate: "",
  images: [],
  newImages: [],
  deletedIndexes: [],
};

const UpdatePost = () => {
  const params = useParams();
  const id = params.postId;
  const [updatedPost, setUpdatedPost] = useState(initialData);

  useEffect(() => {
    const getPostById = async () => {
      const response = await fetch(`/api/blogpost/${id}`);
      const post = await response.json();
      const postData = {
        id: post.id,
        title: post.title,
        content: post.content,
        blogDate: post.blogDate,
        images: post.images,
        newImages: [],
        deletedIndexes: [],
      };
      setUpdatedPost(postData);
    };
    getPostById();
  }, [id]);

  const handleSelectedItems = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files);
    setUpdatedPost({
      ...updatedPost,
      newImages: [...updatedPost.newImages, ...uploadedImages],
    });
  };

  const deleteImage = (index) => {
    const updatedImages = [...updatedPost.images];
    updatedImages.splice(index, 1);
    setUpdatedPost({ ...updatedPost, images: [...updatedImages] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUploadPost = async (event) => {
    event.preventDefault();
    console.log(updatedPost.newImages);
    try {
      const response = await fetch("/api/blogpost", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  if (updatedPost === initialData) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="font-poppins text-[24px] mb-4">Update Post</h1>
        <ImageUploader
          selectedImages={updatedPost.images}
          handleSelectedItems={handleSelectedItems}
          deleteImage={deleteImage}
        />
        <form
          onSubmit={handleUploadPost}
          className="w-[800px] border-2 border-solid border-gray-300 rounded-md text-center mt-6"
        >
          <label>
            <p>Title</p>
            <input
              type="text"
              required
              className="w-[50%] border-2 border-solid border-gray-200 rounded-lg shadow-md my-2 p-2"
              name="title"
              value={updatedPost.title}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Content</p>
            <textarea
              cols="90"
              rows="20"
              className="border-2 border-solid border-gray-200 rounded-lg shadow-md my-2 p-5"
              name="content"
              value={updatedPost.content}
              onChange={handleChange}
            ></textarea>
          </label>
          <button
            type="submit"
            className="mt-4 rounded-full text-violet-700 bg-violet-50 font-semibold hover:bg-violet-100 px-4 py-2"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
