import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        images: post.images, //base64 string
        newImages: [], //file
        deletedIndexes: [],
      };
      setUpdatedPost(postData);
    };
    getPostById();
  }, [id]);

  const createUrls = () => {
    const base64images = updatedPost.images.map(
      (image) => "data:image/webp;base64," + image
    );
    const fileImages = updatedPost.newImages.map((image) =>
      URL.createObjectURL(image)
    );
    return [...base64images, ...fileImages];
  };

  const handleSelectedItems = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files);
    setUpdatedPost({
      ...updatedPost,
      newImages: [...updatedPost.newImages, ...uploadedImages],
    });
  };

  const deleteImage = (index) => {
    const firstLength = updatedPost.images.length;
    if (index < firstLength) {
      const updatedImages = [...updatedPost.images];
      updatedImages.splice(index, 1);
      setUpdatedPost({
        ...updatedPost,
        images: [...updatedImages],
        deletedIndexes: [...updatedPost.deletedIndexes, index],
      });
    } else {
      const updatedImages = [...updatedPost.newImages];
      updatedImages.splice(index - firstLength, 1);
      setUpdatedPost({ ...updatedPost, newImages: [...updatedImages] });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    fetch(`/api/blogpost/${updatedPost.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleUploadPost = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      updatedPost.newImages.forEach((image) => {
        formData.append("newImages", image);
      });
      updatedPost.deletedIndexes.forEach((deletedI) =>
        formData.append("deletedIndexes", deletedI)
      );
      formData.append("id", updatedPost.id);
      formData.append("title", updatedPost.title);
      formData.append("content", updatedPost.content);
      formData.append("blogDate", updatedPost.blogDate);

      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }
      const response = await fetch("/api/blogpost", {
        method: "PUT",
        body: formData,
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
          selectedImages={createUrls()}
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
        <Link to={"/"}>
          <button className="mt-4 rounded-full text-violet-700 bg-violet-50 font-semibold hover:bg-violet-100 px-4 py-2">
            Cancel
          </button>
        </Link>
        <Link to={"/"}>
          <button
            onClick={handleDelete}
            className="mt-4 rounded-full text-violet-700 bg-violet-50 font-semibold hover:bg-violet-100 px-4 py-2"
          >
            Delete Post
          </button>
        </Link>
      </div>
    </>
  );
};

export default UpdatePost;
