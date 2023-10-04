import SnippetListItem from "./SnippetListItem";
import { SnippetContext } from "../contexts/SnippetContext";
import { useContext } from "react";

export default function SnippetList() {
  const { snippetList } = useContext(SnippetContext);
  const [snippets] = snippetList;

  return (
    <div className="flex flex-col h-[80vh] w-[210px] bg-gray-100 rounded-xl p-3 overflow-hidden hover:overflow-y-scroll gap-1">
      {snippets.map((snippet) => (
        <SnippetListItem snippet={snippet} key={snippet.shortId} />
      ))}
    </div>
  );
}
