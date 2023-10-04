import { useState, createContext, useEffect } from "react";
import { AVAILABLE_LANGUAGES } from "../enums/editor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SnippetContext = createContext(null);

export const SnippetProvider = ({ children }) => {
  const history = (path) => window.history.pushState({}, "", path);
  const notify = (msg) => toast(msg);
  const snippet_id = window.location.pathname.split("/")[1];

  // for the editor + navbar
  const [snippet, setSnippet] = useState({
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.javascript,
  });
  const [snippetDIFF, setSnippetDIFF] = useState({
    title: "",
    content: "",
    language: AVAILABLE_LANGUAGES.javascript,
  });

  const [unsavedState, setUnsavedState] = useState(false);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    if (
      snippet.title ||
      snippetDIFF.title ||
      snippet.content !== snippetDIFF.content ||
      snippet.language !== snippetDIFF.language
    ) {
      setUnsavedState(true);
    } else {
      setUnsavedState(false);
    }
  }, [
    snippet.title,
    snippet.content,
    snippet.language,
    snippetDIFF.title,
    snippetDIFF.content,
    snippetDIFF.language,
  ]);

  useEffect(() => {
    if (snippet_id) {
      fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet_id)
        .then((res) => res.json())
        .then((data) => {
          setSnippet(data);
          setSnippetDIFF(data);
        });
    }

    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnippets(data);
      });
  }, []);

  const sendDeleteSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "delete",
    }).then((httpResponse) => {
      if (httpResponse.ok) {
        setSnippet({
          title: "",
          content: "",
          language: AVAILABLE_LANGUAGES.plaintext,
        });
        setUnsavedState(false);
        setSnippetDIFF({
          title: "",
          content: "",
          language: AVAILABLE_LANGUAGES.plaintext,
        });
        history("/");
        notify("Deleted successfully!");
      } else {
        notify("Sorry, something went wrong. Please try again later.");
      }
    });
  };

  const sendUpdateSnippetRequest = () => {
    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets/" + snippet.shortId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => {
        if (httpResponse.ok) {
          notify("Saved the changes successfully!");
        } else {
          notify("Sorry, something went wrong. Please try again later.");
        }
        return httpResponse.json();
      })
      .then((updatedSnippet) => {
        setSnippet(updatedSnippet);
        setSnippetDIFF(updatedSnippet);
        setUnsavedState(false);
      });
  };

  const sendCreateSnippetRequest = (e) => {
    e.preventDefault();

    fetch(import.meta.env.VITE_SNIPPET_API + "/snippets", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
      }),
    })
      .then((httpResponse) => httpResponse.json())
      .then((newlyCreatedSnippet) => {
        setSnippet(newlyCreatedSnippet);
        setUnsavedState(false);
        setSnippetDIFF(newlyCreatedSnippet);

        history("/" + newlyCreatedSnippet.shortId);
        notify("Snippet successfully created!");
      });
  };

  const resetFields = () => {
    setSnippet({
      title: "",
      content: "",
      language: AVAILABLE_LANGUAGES.plaintext,
    });
    history("/");
  };

  useEffect(() => {}, [snippet]);

  // for snippetsList component

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
        unsavedState,
        sendCreateSnippetRequest,
        sendDeleteSnippetRequest,
        sendUpdateSnippetRequest,
        resetFields,

        snippetList: [organisedSnippets(), setSnippets],
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
