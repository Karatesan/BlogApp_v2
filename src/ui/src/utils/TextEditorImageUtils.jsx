import React, { Ref } from "react";
import ReactDOM from "react-dom";
import { Transforms } from "slate";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

export const withImages = (editor, post, setPost) => {
  //wyciaga funkcje z edytora, to sa oryginalne wersje
  const { insertData, isVoid } = editor;
  //override funkcji, zmienia ich działanie. Korzysta z wczesniej zapisanych oryginałow
  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          setPost({ ...post, images: [...post.images, file] });
          insertImage(editor, URL.createObjectURL(file));
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };
  return editor;
};

//----------------------------------------------------------------------------

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  const newParagraph = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, newParagraph);
};

//----------------------------------------------------------------

export const isImage = (file) => {
  if (!file) return false;
  const extension = file.name.split(".").pop();
  return imageExtensions.includes(extension);
};

//----------------------------------------------------------------------

export const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
