import React, { useState } from "react";
import PropTypes from "prop-types";
import { DoNotDisturb } from "@mui/icons-material";

//selected images - state from parent component where u hold image 
//multiple - do you allow to upload multiple files at once
//handleSelectedItems - handler for upload - same with delete

const ImageUploader = ({
  multiple,
  title,
  selectedImages,
  handleSelectedItems,
  deleteImage,
}) => {
  return (
    <div className="flex flex-col items-center mt-6 border-2 border-gray-300 border-solid rounded-xl shadow-md p-5 w-[50%]">
      <h1 className="font-poppins font-semibold text-[20px] mb-4">
        Add {title}
      </h1>
      <input
        type="file"
        {...(multiple ? { multiple: "multiple" } : {})}
        onChange={(event) => {
          handleSelectedItems(event);
        }}
        className=" text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-100 file:text-violet-700
      hover:file:bg-violet-200"
      />

      <div className="flex justify-center flex-wrap relative w-full">
        {selectedImages.map((image, index) => (
          <div key={index} className={` `}>
            <div className="relative" onClick={() => deleteImage(index)}>
              <img
                src={image}
                alt={`Image ${index}`}
                className=" w-[100px] h-[100px] object-contain my-4"
              />

              <DoNotDisturb
                sx={{ fontSize: 50 }}
                className="absolute opacity-0 hover:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-700 "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  handleSelectedItems: PropTypes.func,
  selectedImages: PropTypes.array,
  deleteImage: PropTypes.func,
  imageSrcFunc: PropTypes.func,
};

export default ImageUploader;
