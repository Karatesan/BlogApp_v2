import escapeHtml from "escape-html";
import { Text } from "slate";
import { alignToJustify } from "./TextEditorUtils";
import { getStyles, getStylesCSS } from "./TextEditorUtils";

export const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }
  const children = node.children.map((n) => serialize(n)).join("");
  const styles = getStylesCSS(node);
  const propertyName = Object.keys(styles)[0];
  const propertyValue = styles[propertyName];

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "heading-one":
      return `<h1 style="${propertyName}:${propertyValue}">${children}</h1>`;
    case "heading-two":
      return `<h2 style="${propertyName}:${propertyValue}">${children}</h2>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "image": {
      const isFloating = node.textAlign ? false : node.align ? true : false;
      return `
        <div
          className="relative ${
            !isFloating ? "flex " + alignToJustify(node.textAlign) : ""
          }"
        >
          <img
            src={escapeHtml(node.url)}
            className="z-0 max-w-[100%] max-h-[20em] ml-4 mr-4 mb-4 ${
              isFloating ? node.align : ""
            }"
          />

          {children}
        </div>
      `;
    }
    default: {
      return children;
    }
  }
};
