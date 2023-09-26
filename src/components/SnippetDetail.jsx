import { useParams } from "react-router-dom";

// get id from params

// =======================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeBlock from "./CodeBlock";

export default function SnippetDetail() {
  const history = useNavigate();
  let { snippet_id } = useParams();
  const [snippet, setSnippet] = useState();

  useEffect(() => {
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, []);

  const handleEdit = (value) => {
    setSnippet({ ...snippet, content: value });
  };

  const handleDelete = () => {
    fetch("http://localhost:9000/snippets/" + snippet.shortId, {
      method: "DELETE",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        history("/");
      } else {
        alert("Sorry,something went wrong.Please try again later.");
      }
    });
  };

  const handleSave = () => {
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
        alert("Sorry,something went wrong.Please try again later.");
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippet ? (
        <div
          style={{ border: "1px solid black", margin: "10px" }}
          key={snippet.id}
        >
          <a href={`/${snippet.id}`}></a>
          <p>
            <span>{snippet.title}</span>
          </p>
          <p>
            <span>{snippet.id}</span>
          </p>
          <p>{new Date(snippet.updatedAt).toLocaleDateString()}</p>

          <textarea
            value={snippet.title}
            onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
          />

          <CodeBlock
            code={snippet.content || "This snippet is empty."}
            handleEdit={handleEdit}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
