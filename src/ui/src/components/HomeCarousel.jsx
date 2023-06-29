import React, { useState, useLayoutEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CarouselCard from "./CarouselCard";

const HomeCarousel = ({ posts }) => {
  return (
    <>
      <Carousel autoPlay={false} className="bg-black pb-4 h-[85vh]">
        {posts === null
          ? "Data is loading"
          : posts.map((post) => {
              return (
                <Paper key={post.id} className="bg-black w-full h-[70vh]">
                  <CarouselCard post={post} />
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
