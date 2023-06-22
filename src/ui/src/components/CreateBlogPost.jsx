import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

const initialData = { title: "", content: "", images: [] };

const CreateBlogPost = () => {
  const [post, setPost] = useState(initialData);

  const handleSelectedItems = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files);
    console.log(uploadedImages);
    setPost({ ...post, images: [...post.images, ...uploadedImages] });
  };

  const deleteImage = (index) => {
    const updatedImages = [...post.images];
    updatedImages.splice(index, 1);
    setPost({ ...post, images: [...updatedImages] });
  };

  const createUrl = () => {
    return post.images.map((image) => URL.createObjectURL(image));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  };

  const handleUploadPost = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      post.images.forEach((image) => {
        formData.append("images", image);
      });

      const elements = event.target.elements;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.name) formData.append(element.name, element.value);
      }

      const response = await fetch("api/blogpost", {
        method: "POST",
        body: formData,
      });

      // Handle the response as needed
      setPost(initialData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="font-poppins text-[24px] mb-4">Create new post</h1>
        <ImageUploader
          selectedImages={createUrl()}
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
            />
          </label>
          <label>
            <p>Content</p>
            <textarea
              cols="90"
              rows="20"
              className="border-2 border-solid border-gray-200 rounded-lg shadow-md my-2 p-5"
              name="content"
            ></textarea>
          </label>
          <button
            type="submit"
            className="mt-4 rounded-full text-violet-700 bg-violet-50 font-semibold hover:bg-violet-100 px-4 py-2"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlogPost;
