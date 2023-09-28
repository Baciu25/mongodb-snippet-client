import { useEffect, useState } from "react";
import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../contexts/SnippetContext";
import { useContext } from "react";

export default function SnippetList() {
  const { snippetList } = useContext(SnippetContext);
  const [snippets, setSnippets] = snippetList;

  useEffect(() => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippets(data);
      });
  }, []);

  return (
    <div className="flex flex-col h-[80vh] w-[210px] bg-gray-100 rounded-xl p-3 overflow-hidden hover:overflow-y-scroll gap-1">
      {snippets.map((snippet) => (
        <SnippetListItem snippet={snippet} key={snippet.shortId} />
      ))}
    </div>
  );
}
