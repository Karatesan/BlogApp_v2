import React from "react";

const CustomButton = ({ quill }) => {
  const handleCustomButtonClick = () => {
    console.log("Dupa");
  };

  return (
    <button
      type="button"
      className="ql-custom"
      onClick={handleCustomButtonClick}
    >
      Custom Button
    </button>
  );
};

export default CustomButton;
