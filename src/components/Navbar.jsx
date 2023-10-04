import { useContext } from "react";
import { SnippetContext } from "../contexts/SnippetContext";
import { ApplicationSettingsContext } from "../contexts/ApplicationSettingsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AVAILABLE_LANGUAGES } from "../enums/editor";

export default function Navbar() {
  const notify = (msg) => toast(msg);

  const {
    resetFields,
    editor,
    unsavedState,
    sendCreateSnippetRequest,
    sendDeleteSnippetRequest,
    sendUpdateSnippetRequest,
  } = useContext(SnippetContext);
  const { darkMode, toggleDarkMode } = useContext(ApplicationSettingsContext);
  const [snippet, setSnippet] = editor;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notify("Copied to clipboard!");
  };

  const handleSwitchToNewSnippet = () => {
    if (unsavedState) {
      const result = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!result) return;
    }
    resetFields();
  };

  return (
    <div
      id="navbar"
      className={`z-50 fixed top-5 right-5 flex gap-4 rounded-xl p-3 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100"
      }`}
    >
      <span>
        {unsavedState && (
          <span>
            You have unsaved changes.{" "}
            {snippet.updatedAt && (
              <span>
                (last saved at{" "}
                {new Date(snippet.updatedAt).toLocaleDateString()})
              </span>
            )}{" "}
          </span>
        )}
      </span>

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
      {snippet.shortId && (
        <button onClick={handleSwitchToNewSnippet}> + create snippet</button>
      )}
    </div>
  );
}
