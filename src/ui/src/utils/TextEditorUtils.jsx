import {
  useSlateStatic,
  ReactEditor,
  useFocused,
  useSelected,
} from "slate-react";
import { Transforms, Editor, Element } from "slate";

//CONSTS

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const WRAP_TEXT_TYPES = ["wrap_left", "wrap_right"];

//--------------------------------------------------------------------------------

export const alignToJustify = (align) => {
  switch (align) {
    case "left":
      return "justify-start";
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
  }
};

//---------------------------------------------------------------------------------

export const toFloat = (float) => {
  return float === "wrap_right" ? "right" : "left";
};

//Buttons ----------------------------------------------------------------
//------------------------------------------------------------------------

const Icon = ({ children }) => {
  return <span className="material-icons">{children}</span>;
};
//-------------------------------------------------------------------

//export const StyledButton = ({ editor, format, icon, buttonType })

export const MarkButton = ({ editor, format, icon }) => {
  return (
    <button
      className="flex justify-center items-center p-1 hover:bg-gray-200 rounded-md shadow-inner"
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
      title={format}
    >
      <Icon>{icon}</Icon>
    </button>
  );
};

//-------------------------------------------------------------------------

export const BlockButton = ({ editor, format, icon }) => {
  return (
    <button
      className="flex justify-center items-center p-1 hover:bg-gray-200 rounded-md shadow-inner"
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
      title={format}
    >
      <Icon>{icon}</Icon>
    </button>
  );
};

//---------------------------------------------------------------------

export const InsertImageButton = ({ setImageInput }) => {
  return (
    <button
      className="flex justify-center items-center p-1 hover:bg-gray-200 rounded-md shadow-inner"
      onMouseDown={(event) => {
        event.preventDefault();
        setImageInput(true);
      }}
    >
      <Icon>image</Icon>
    </button>
  );
};

//-------------------------------------------------------------------------
//Models

export const BlockElement = ({ attributes, children, element }) => {
  const isFloating = element.float ? true : false;
  const style = getStyles(element);

  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          style={style}
          {...attributes}
          className="pl-[20px] list-disc list-inside"
        >
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1
          className="text-[2em] font-bold my-[0.3em] mx-0"
          style={style}
          {...attributes}
        >
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2
          style={style}
          {...attributes}
          className="text-[1.5em] font-bold my-[0.3em] mx-0"
        >
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes} className="my-[0.5em]">
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol
          style={style}
          {...attributes}
          className="pl-[20px] list-decimal list-inside"
        >
          {children}
        </ol>
      );
    case "image": {
      return (
        <Image style={style} attributes={attributes} element={element}>
          {children}
        </Image>
      );
    }
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

//-------------------------------------------------------------------------

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

//-------------------------------------------------------------------

export const Image = ({ attributes, element, style, children }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const selected = useSelected();
  const focused = useFocused();
  const isFloating = style.textAlign ? false : true;
  return (
    <div
      {...attributes}
      contentEditable={false}
      className={`relative ${
        !isFloating ? "flex " + alignToJustify(style.textAlign) : ""
      }`}
    >
      <img
        src={element.url}
        className={`z-0 max-w-[100%] max-h-[20em] ml-4 mr-4 mb-4 `}
        style={style}
      />

      {children}
      <button
        onClick={() => {
          Transforms.removeNodes(editor, { at: path });
        }}
        className={`
              z-100
              absolute
              top-[0.5em]
              left-[0.5em] background-white
            `}
      >
        <Icon>delete</Icon>
      </button>
    </div>
  );
};

//---------------------------------------------------------------------------------------------------
export const CustomEditor = {
  //------------------------------------------------------------------------

  isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : (marks[format] = false);
  },

  //------------------------------------------------------------------------

  isBlockActive(editor, format, blockType = "type") {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType] === format,
      })
    );
    return !!match;
  },

  //------------------------------------------------------------------------

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  //------------------------------------------------------------------------

  toggleBlock(editor, format) {
    console.log(editor);
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format)
        ? "align"
        : WRAP_TEXT_TYPES.includes(format)
        ? "float"
        : "type"
    );

    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        ...newProperties,
        align: isActive ? undefined : format,
      };
    } else if (WRAP_TEXT_TYPES.includes(format)) {
      newProperties = {
        ...newProperties,
        float: isActive ? undefined : format,
        align: undefined,
      };
    } else {
      newProperties = {
        ...newProperties,
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      };
    }
    //setNodes ustawia nodesy w konkretnej lokalziacji, jezeli sie nie poda lokalziacji, to bierze z edytora parametr selection - to co jest zazanczone myszka
    Transforms.setNodes(editor, newProperties, {
      match: (n) => Editor.isBlock(editor, n) && Element.isElement(n),
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
};

export const getStyles = (element) => {
  const isFloating = element.float ? true : false;
  const style =
    element.type !== "image"
      ? { textAlign: element.align }
      : isFloating
      ? { float: toFloat(element.float) }
      : { textAlign: element.align };
  return style;
};

export const getStylesCSS = (element) => {
  const isFloating = element.float ? true : false;
  const style =
    element.type !== "image"
      ? { "text-align": element.align }
      : isFloating
      ? { float: toFloat(element.float) }
      : { "text-align": element.align };
  return style;
};
