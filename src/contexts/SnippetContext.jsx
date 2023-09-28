import { useState, createContext, useEffect } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
export const SnippetContext = createContext(null);

export const SnippetProvider = ({ children }) => {
  // for the editor + navbar
  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.javascript,
  });

  // for snippetsList component
  const [snippets, setSnippets] = useState([]);

  const organisedSnippets = () => {
    // 1) if snippet.shortId exists, that means we have an existing snippet from the database
    // and so we can place it at the top of the list
    // 2) sort out the rest of the snippets by date ( reverse chronological order )

    // let organisedSnippets = [
    //   ...snippets.sort((a, b) => {
    //     if (a.shortId === snippet.shortId) {
    //       return -1;
    //     } else if (b.shortId === snippet.shortId) {
    //       return 1;
    //     } else {
    //       return b.updatedAt - a.updatedAt;
    //     }
    //   }),
    // ];

    if (snippet.shortId) {
      return [
        snippet,
        ...snippets
          .filter((s) => s.shortId !== snippet.shortId)
          .sort((a, b) => b.updatedAt - a.updatedAt),
      ];
    } else {
      return [...snippets.sort((a, b) => b.updatedAt - a.updatedAt)];
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
