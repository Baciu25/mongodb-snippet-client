import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CodeBlock from "./CodeBlock";
// ===============================

import { useEffect, useState } from "react";
// its the way we access lifecycle events ( componented started, data changed, component dying )

export default function Editor() {
  const history = useNavigate();
  let { snippet_id } = useParams();
  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
  });

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

  const sendDeleteSnippetRequest = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "delete",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet({ title: "", content: "" });
        history("/");
      } else {
        alert("Sorry, something went wrong. Please try again later.");
      }
    });
  };

  const sendUpdateSnippetRequest = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
      }),
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        alert("Saved the changes successfully!");
      } else {
        alert("Sorry, something went wrong. Please try again later.");
      }
    });
  };

  const sendCreateSnippetRequest = (e) => {
    e.preventDefault();

    fetch("http://localhost:9000/snippets", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) =>
        history("/" + newlyCreatedSnippet.shortId)
      );
  };

  return (
    <div className="mt-14 md:mt-0">
      <CodeBlock code={snippet.content} handleEdit={handleEdit} />

      <div
        id="navbar"
        className="fixed top-5 right-5 flex gap-4 bg-red-300 rounded-xl p-3"
      >
        {snippet.createdAt && (
          <p>{new Date(snippet.createdAt).toLocaleDateString()}</p>
        )}
        <input
          value={snippet.title}
          onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        />
        <select>
          <option value="language">language</option>
        </select>

        {snippet.shortId ? (
          <button onClick={sendUpdateSnippetRequest}>Save</button>
        ) : (
          <button onClick={sendCreateSnippetRequest}>Copy Link</button>
        )}

        {snippet.shortId && (
          <button onClick={sendDeleteSnippetRequest}>Delete</button>
        )}
      </div>
    </div>
  );
}
