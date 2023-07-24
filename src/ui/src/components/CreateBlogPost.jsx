import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { createUrl } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";
import SlateTextEditor from "./SlateTextEditor";

const initialData = {
  title: "",
  content: "Create your post...",
  author: "",
  poster: [],
  rating: "",
  images: [],
};

const CreateBlogPost = () => {
  const [post, setPost] = useState(initialData);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  //Handle image selection ------------------------------------------------

  const handleSelectedGalleryImages = (event) => {
    const files = event.target.files;

    const uploadedImages = Array.from(files);
    setPost({ ...post, images: [...post.images, ...uploadedImages] });
  };

  //------------------------------------------------------------------------

  // const handleSelectedPoster = (event) => {
  //   const file = event.target.files[0];
  //   setDescription(true);
  //   setPost({ ...post, poster: [{ image: file, description: "" }] });
  // };

  //------------------------------------------------------------------------

  const handleDescription = (index, event) => {
    const desc = event.target.value;
    let postImages = post.images;
    postImages[index].description = desc;
    setPost({ ...post, images: postImages });
  };

  //------------------------------------------------------------------------

  const deleteImage = (index) => {
    const updatedImages = [...post.images];
    updatedImages.splice(index, 1);
    setPost({ ...post, images: [...updatedImages] });
  };

  //------------------------------------------------------------------------

  const handleUploadPost = async (event) => {
    event.preventDefault();
    setCreating(true);
    try {
      const formData = new FormData();
      post.images.forEach((image, index) => {
        formData.append("images", image.image);
        formData.append("descriptions", image.description);
      });
      console.log(post.images);
      //formData.append("poster", post.poster[0].image);
      formData.append("author", "Anonymous");
      post.images.forEach((image) => {
        formData.append("description", image.description);
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
      console.log("w errorze");
      setError(error);
      setCreating(false);
    }
    if (!error) navigate("/");
  };

  //------------------------------------------------------------------------

  return (
    <>
      <div
        className={`flex flex-col items-center relative ${
          creating ? "opacity-50 " : "opacity-100"
        }`}
      >
        {creating && (
          <div className="flex flex-col items-center fixed top-[50%] left-[50%] -translate-x-[50px] w-[100px] text-[20px]">
            Saving
            <div className="rounded-full border-4 border-blue-500 border-dashed animate-spin h-[20px] w-[20px]"></div>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center fixed top-[50%] left-[50%] -translate-x-[50px] w-[400px] text-[20px]">
            <h2>Oops, something went wrong</h2>
            <p>{error}</p>
          </div>
        )}
        <h1 className="font-poppins text-[24px] mb-4">Create new post</h1>
        {/* <ImageUploader
          multiple={false}
          title="poster"
          selectedImages={createUrl(post.poster)}
          handleSelectedItems={handleSelectedPoster}
          deleteImage={deleteImage}
          handleDescription={handleDescription}
          description={description}
        /> */}
        <label htmlFor="title">
          <h1 className="text-[20px] mb-4">Title</h1>
        </label>
        <input
          id="title"
          value={post.title}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
          type="text"
          required
          className="w-[50%] border-2 border-solid border-gray-200 rounded-lg shadow-md mb-6 p-2"
          name="title"
        />

        <label>
          <p>Rating</p>
          <input
            type="number"
            max="10"
            required
            className="border-2 border-solid border-gray-200 rounded-lg shadow-md my-2 p-2"
            name="rating"
          />
        </label>
        <br />
        <SlateTextEditor post={post} setPost={setPost} />
        <button
          type="submit"
          className="my-4 rounded-full text-violet-700 bg-violet-50 font-semibold hover:bg-violet-100 px-4 py-2"
          onClick={(event) => handleUploadPost(event)}
        >
          Upload
        </button>

        {/*<div className="flex relative justify-start border-2 border-solid border-red-500 w-full">
        <img src="https://i.imgur.com/MAFHBP6.jpeg" className="max-w-[100%] max-h-[20em]" />
      </div>*/}
        {/* <div className="flex flex-row">
          <div id="imageContainer" className="w-[50%] m-10">
            <img src="https://i.imgur.com/MAFHBP6.jpeg" className="" />
          </div>
          <div id="imageContainer" className="w-[50%] m-10">
            <img src="https://i.imgur.com/MAFHBP6.jpeg" className="" />
          </div>
          <p className="mx-[50px] mt-10">Testujemy tekst</p>
        </div>
        <div className="flex flex-row">
          <div id="imageContainer" className="w-[50%] m-10">
            <img src="https://i.imgur.com/MAFHBP6.jpeg" className="" />
          </div>
          <div id="imageContainer" className="w-[50%] m-10">
            <img src="https://i.imgur.com/MAFHBP6.jpeg" className="" />
          </div>
          <p className="mx-[50px] mt-10">Testujemy tekst</p>
        </div>
      <textarea className="test" />*/}
      </div>
    </>
  );
};

export default CreateBlogPost;
