import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { useRef, useState } from "react";
import CustomButton from "./CustomButton";

Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons

    [{ list: "ordered" }, { list: "bullet" }],
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["link", "image"],
    ["clean"], // remove formatting button
  ],

  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
  handlers: {
    image: function (value) {
      if (value) console.log("DDDDUPAA");
      else console.log("KUPA");
    },
  },
};

const TextEditor = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
