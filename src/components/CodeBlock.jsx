import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// we use the @uiw/codemirror-theme-vscode  theme
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const extensions = [javascript({ jsx: true })];

export default function CodeBlock({ code, handleEdit }) {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    handleEdit(value);
  }, []);
  return (
    <CodeMirror
      linewrapping="true"
      className="max-w-[45vw] min-w-[35vw] text-2xl overflow-x-hidden break-words"
      value={code}
      height="70vh"
      theme={vscodeDark}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
