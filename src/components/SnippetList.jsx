import { useEffect, useState } from "react";
import SnippetListItem from "./SnippetListItem";

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
        <SnippetListItem snippet={snippet} key={snippet.shortId} />
      ))}
    </div>
  );
}
