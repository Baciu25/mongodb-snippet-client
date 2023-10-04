import CodeBlock from "./CodeBlock";
import { SnippetContext } from "../contexts/SnippetContext";
import { useContext, useEffect } from "react";
// its the way we access lifecycle events ( componented started, data changed, component dying )

export default function Editor() {
  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  return (
    <div className="mt-14 md:mt-0">
      <CodeBlock code={snippet.content} handleEdit={handleEdit} />
    </div>
  );
}
