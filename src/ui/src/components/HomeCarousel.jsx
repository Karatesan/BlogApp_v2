import React, { useState, useLayoutEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeCarousel = ({ posts }) => {
  return (
    <>
      <Carousel autoPlay={false}>
        {posts === null
          ? "Data is loading"
          : posts.map((post) => {
              const { id, title, content, blogDate, images } = post;
              const imageURL = `data:image/webp;base64,${images[0]}`;
              return (
                <Paper key={id}>
                  <div className="poster-background w-full h-[70vh] flex flex-col">
                    <div className="flex-1 poster-background mt-4 relative">
                      <img
                        src={imageURL}
                        alt="poster"
                        className="object-cover w-full h-full absolute"
                      />
                    </div>
                    <div className="mt-10 text-center">
                      <Link to={`/UpdatePost/${id}`}>
                        <button className="text-white">Update</button>
                      </Link>
                    </div>
                  </div>
                </Paper>
              );
            })}
      </Carousel>
    </>
  );
};

HomeCarousel.propTypes = {
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default HomeCarousel;
