import React from "react";
import { getBase64Url } from "../utils/utils";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

const BlogPostcCard = ({ post, row }) => {
  let imageSide = row % 2 === 0;
  if (imageSide)
    return (
      <div className="flex md:h-[400px] h-[300px] text-center">
        <div className="flex-1 ">
          <img
            src={getBase64Url(post.poster.base64image)}
            className="object-cover w-[100%] h-[100%]"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-[32px] font-poppins my-8">{post.title}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
            className="font-poppins overflow-hidden mx-10 mb-4 text-gray-500"
          ></p>
        </div>
      </div>
    );
  else
    return (
      <div className="flex h-[400px]">
        <div className="flex-1 flex flex-col">
          <h2 className="text-[32px] font-poppins text-center my-8">
            {post.title}
          </h2>
          <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }} className="font-poppins overflow-hidden mx-8 mb-4 text-gray-500">
           
          </p>
        </div>
        <div className="flex-1 ">
          <img
            src={getBase64Url(post.poster.base64image)}
            className="object-cover w-[100%] h-[100%]"
          />
        </div>
      </div>
    );
};

BlogPostcCard.propTypes = {
  post: PropTypes.object,
  row: PropTypes.number,
};

export default BlogPostcCard;
