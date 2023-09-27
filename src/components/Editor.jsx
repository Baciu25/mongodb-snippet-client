import { useParams } from "react-router-dom";

import CodeBlock from "./CodeBlock";
import { SnippetContext } from "../SnippetContext";

import { useContext, useEffect } from "react";
// its the way we access lifecycle events ( componented started, data changed, component dying )

export default function Editor() {
  let { snippet_id } = useParams();

  const { editor } = useContext(SnippetContext);
  const [snippet, setSnippet] = editor;

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  useEffect(() => {
    if (!snippet_id) {
      return;
    }
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, []);

  return (
    <div className="mt-14 md:mt-0">
      <CodeBlock code={snippet.content} handleEdit={handleEdit} />
    </div>
  );
}
