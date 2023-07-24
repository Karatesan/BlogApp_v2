import React from "react";
import { PropTypes } from "prop-types";

const ImageInput = ({ handleSelectedItems }) => {
  return (
    <input
      type="file"
      multiple
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
  );
};
ImageInput.propTypes = {
  handleSelectedItems: PropTypes.func,
};

export default ImageInput;
