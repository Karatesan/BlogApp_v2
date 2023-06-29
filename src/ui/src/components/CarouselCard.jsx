import React from "react";
import { Link } from "react-router-dom";

const CarouselCard = ({ post }) => {
  const { id, title, content, blogDate, images } = post;
  const imageURL = `data:image/webp;base64,${images[0]}`;
  return (
    <div
      className="bg-black w-ful h-full flex flex-col justify-end items-center absolute w-full bg-cover bg-center bg-no-repeat z-10 "
      style={{ backgroundImage: `url(${imageURL})` }}
    >
      <h1 className="text-white font-poppins z-20 text-[50px]">
        <hr />
        {title}
      </h1>
    </div>
  );
};

export default CarouselCard;
