import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// we use the @uiw/codemirror-theme-vscode  theme
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const extensions = [javascript({ jsx: true })];

export default function CodeBlock({ code, handleEdit }) {
  const onChange = React.useCallback((value, viewUpdate) => {
    handleEdit(value);
  }, []);

  return (
    <CodeMirror
      height="100%"
      className="h-screen"
      linewrapping="true"
      value={code}
      theme={vscodeDark}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
