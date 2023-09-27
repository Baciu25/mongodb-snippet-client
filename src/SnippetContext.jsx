import { createContext, useState } from "react";

export const SnippetContext = createContext(null);

export const SnippetProvider = ({ children }) => {
  // for the navbar
  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
  });

  //   fot the list of snippets
  const [snippets, setSnippets] = useState([]);

  const organisedSnippets = () => {
    if (snippet.shortId) {
      return [
        snippet,
        ...snippets
          .filter((s) => s.shortId !== snippet.shortId)
          .sort((a, b) => b.updatedAt - a.updatedAt),
      ];
    } else {
      return snippets.sort((a, b) => b.updatedAt - a.updatedAt);
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        editor: [snippet, setSnippet],
        snippetList: [organisedSnippets(), setSnippets],
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
