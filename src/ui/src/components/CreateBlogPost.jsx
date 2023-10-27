import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { createUrl } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";
import SlateTextEditor from "./SlateTextEditor";
import { serialize } from "../utils/SlateSerializer";

const initialData = {
  title: "",
  content: "Create your post...",
  author: "",
  poster: null,
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
    setError(null);
    try {
      const formData = new FormData();
      post.images.forEach((image, index) => {
        formData.append("images", image);
      });

      //formData.append("poster", post.poster[0].image);
      formData.append("author", "Anonymous");
      formData.append("title", post.title);
      formData.append("rating", post.rating);
      formData.append("content", serialize(post.content));

      // const elements = event.target.elements;
      // for (let i = 0; i < elements.length; i++) {
      //   const element = elements[i];
      //   if (element.name) formData.append(element.name, element.value);
      // }

      const response = await fetch("api/blogpost", {
        method: "POST",
        body: formData,
      });

      // Handle the response as needed
      setPost(initialData);
      navigate("/");
      setCreating(false);
    } catch (error) {
      setError(error.message);
    }
  };

  //------------------------------------------------------------------------

  return (
    <>
      <div
        className={`flex flex-col items-center relative ${
          creating ? "opacity-50 " : "opacity-100"
        }`}
      >
        {creating && !error && (
          <div className="flex flex-col items-center fixed top-[50%] left-[50%] -translate-x-[50px] w-[100px] text-[20px]">
            Saving
            <div className="rounded-full border-4 border-blue-500 border-dashed animate-spin h-[20px] w-[20px]"></div>
          </div>
        )}
        {error && (
          <div className="z-[100] bg-white flex flex-col items-center justify-center fixed top-[50%] left-[50%] -translate-x-[200px] -translate-y-[100px] text-[20px] border-2 border-solid border-red-500 w-[400px] h-[200px]">
            <h2 className="text-[16px] text-black">ERROR KURWA!!!!</h2>
            <p className="text-[16px] text-black">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setCreating(false);
              }}
            >
              Usuń Error Kurwo
            </button>
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
            min="1"
            max="10"
            onChange={(event) =>
              setPost({ ...post, rating: event.target.value })
            }
            value={post.rating}
            required
            className="border-2 border-solid border-gray-200 rounded-lg shadow-md my-2 p-2"
            name="rating"
          />
        </label>
        <br />

        <div className="flex justify-center flex-wrap relative w-full">
          {post.images.map((image, index) => (
            <div key={index} className={` `}>
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className=" w-[100px] h-[100px] object-contain my-4"
                />
              </div>
            </div>
          ))}
        </div>
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
