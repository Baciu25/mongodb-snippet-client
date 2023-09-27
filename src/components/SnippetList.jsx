import { useEffect, useState } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../SnippetContext";
import { useContext } from "react";

export default function SnippetList() {
  const { snippetList } = useContext(SnippetContext);
  const [snippets, setSnippets] = snippetList;

  useEffect(() => {
    fetch("http://localhost:9000/snippets")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippets(data);
      });
  }, []);

  return (
    <div className="flex flex-col h-[60vh] w-[210px] bg-red-300 rounded-xl p-3">
      {snippets.map((snippet) => (
        <SnippetListItem snippet={snippet} key={snippet.shortId} />
      ))}
    </div>
  );
}
