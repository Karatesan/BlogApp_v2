import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";

const Images = () => {
  const [images, setImages] = useState([]);

  useLayoutEffect(() => {
    const getImages = async () => {
      const response = await fetch("/api/images");
      const images = await response.json();
      setImages(images);
    };
    getImages().catch((e) => {
      console.log("error fetching customers: " + e);
    });
  }, []);

  return (
    <div>
      <ul className="flex flex-row justify-center">
        {images.map((image, index) => {
          return (
            <li key={index}>
              <img
                src={`data:image/jpg;base64,${image}`}
                alt="Image"
                className="w-[200px] h-[200px] object-contain"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Images;
