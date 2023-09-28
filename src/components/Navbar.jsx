import { useContext } from "react";
import { SnippetContext } from "../contexts/SnippetContext";
import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { AVAILABLE_LANGUAGES } from "../enums/editor";

export default function Navbar() {
  const notify = (msg) => toast(msg);
  const history = useNavigate();

  const { editor } = useContext(SnippetContext);
  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);
  const [snippet, setSnippet] = editor;

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
        history("/" + newlyCreatedSnippet.shortId);
        notify("Snippet successfully created!");
      });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notify("Copied to clipboard!");
  };

  return (
    <div
      id="navbar"
      className={`z-50 fixed top-5 right-5 flex gap-4 rounded-xl p-3 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100"
      }`}
    >
      {snippet.createdAt && (
        <p>{new Date(snippet.createdAt).toLocaleDateString()}</p>
      )}
      <input
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
      />
      <select
        value={snippet.language}
        onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
      >
        {Object.keys(AVAILABLE_LANGUAGES).map((lang) => (
          <option key={lang} value={AVAILABLE_LANGUAGES[lang]}>
            {lang}
          </option>
        ))}
      </select>

      {/* <button>FIX my code (gpt-4)</button> */}
      <button onClick={toggleDarkMode}>toggle theme</button>
      {snippet.shortId ? (
        <button onClick={sendUpdateSnippetRequest}>Save Changes</button>
      ) : (
        <button onClick={sendCreateSnippetRequest}>Save</button>
      )}

      {snippet.shortId && <button onClick={copyLink}>Copy Link</button>}
      {snippet.shortId && (
        <button onClick={sendDeleteSnippetRequest}>Delete</button>
      )}
    </div>
  );
}
