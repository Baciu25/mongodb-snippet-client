import { useParams } from "react-router-dom";

// get id from params

// =======================
import { useEffect, useState } from "react";

export default function SnippetDetail() {
  let { snippet_id } = useParams();
  const [snippet, setSnippet] = useState();

  useEffect(() => {
    fetch("http://localhost:9000/snippets/" + snippet_id)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, []);
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
          <>{new Date(snippet.modifiedAt).toLocaleDateString()}</>
          <p>{snippet.content}...</p>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
