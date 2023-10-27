import { useCallback, useState } from "react";
import { createEditor } from "slate";
import {
  BlockButton,
  MarkButton,
  InsertImageButton,
  BlockElement,
  Leaf,
  CustomEditor,
} from "../utils/TextEditorUtils";
import {
  withImages,
  isImage,
  insertImage,
} from "../utils/TextEditorImageUtils";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import ImageInput from "./ImageInput";

// Define our own custom set of helpers.

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const SlateTextEditor = ({ post, setPost }) => {
  const [imageInput, setImageInput] = useState(false);
  const [editor] = useState(() =>
    withImages(withReact(createEditor()), post, setPost)
  );
  const renderElement = useCallback((props) => <BlockElement {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const handleSelectedItems = (event) => {
    setImageInput(false);

    const files = event.target.files;
    const selectedItem = files[0];
    const [mime] = selectedItem.type.split("/");

    if (mime === "image" && isImage(selectedItem)) {
      setPost({ ...post, images: [...post.images, selectedItem] });
      insertImage(editor, URL.createObjectURL(selectedItem));
    } else {
      console.log("Error");
    }
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={() => {
        setPost({ ...post, content: editor });
      }}
    >
      <div className="relative flex justify-around items-center py-[25px] w-[42vw] h-[40px] shadow-md rounded-md mb-4 bg-gray-50">
        <MarkButton editor={editor} format="bold" icon="format_bold" />
        <MarkButton editor={editor} format="italic" icon="format_italic" />
        <MarkButton
          editor={editor}
          format="underline"
          icon="format_underlined"
        />
        <MarkButton editor={editor} format="code" icon="code" />
        <BlockButton editor={editor} format="heading-one" icon="looks_one" />
        <BlockButton editor={editor} format="heading-two" icon="looks_two" />
        <BlockButton editor={editor} format="block-quote" icon="format_quote" />
        <BlockButton
          editor={editor}
          format="numbered-list"
          icon="format_list_numbered"
        />
        <BlockButton
          editor={editor}
          format="bulleted-list"
          icon="format_list_bulleted"
        />
        <BlockButton editor={editor} format="left" icon="format_align_left" />
        <BlockButton
          editor={editor}
          format="center"
          icon="format_align_center"
        />
        <BlockButton editor={editor} format="right" icon="format_align_right" />
        <BlockButton
          editor={editor}
          format="justify"
          icon="format_align_justify"
        />
        <InsertImageButton setImageInput={setImageInput} />
        <BlockButton
          editor={editor}
          format="wrap_left"
          icon="format_align_left"
        />
        <BlockButton
          editor={editor}
          format="wrap_right"
          icon="format_align_right"
        />
        {imageInput && (
          <ImageInput className="" handleSelectedItems={handleSelectedItems} />
        )}
      </div>

      <Editable
        className="w-[70vw] h-[1000px] border-2 border-solid border-black p-4 rounded-md"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Piszuj tutaj bydlaku"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleBlock(editor, "heading-one");
              break;
            }

            case "b": {
              event.preventDefault();
              ReactEditor.isFocused(editor)
                ? ReactEditor.blur(editor)
                : ReactEditor.focus(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

//Leaf and Block elements -------------------------------------------------------------------------

export default SlateTextEditor;
