import { useEffect, useState } from "react";

export default function SnippetList() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {snippets.map((snippet) => (
        <div
          style={{ border: "1px solid black", margin: "10px" }}
          key={snippet.id}
        >
          <a href={`/${snippet.id}`}>{snippet.title}</a>
          <p>
            <span>{snippet.title}</span>
          </p>
          <p>
            <span>{snippet.id}</span>
          </p>
          <>{new Date(snippet.modifiedAt).toLocaleDateString()}</>
          <p>{snippet.content.substring(0, 40)}...</p>
        </div>
      ))}
    </div>
  );
}
