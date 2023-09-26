// id
// title
// createdAt
// updatedAt
// content

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SnippetCreationForm() {
  const titleRef = useRef();
  const contentRef = useRef();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titleRef.current.value, contentRef.current.value);

    fetch("http://localhost:9000/snippets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((newlyCreatedSnippet) =>
        history("/" + newlyCreatedSnippet.shortId)
      );
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="Title">
        Title
        <input name="Title" ref={titleRef} />
      </label>

      <label htmlFor="content">Content</label>
      <textarea name="content" ref={contentRef}></textarea>
      <button>create snippet</button>
    </form>
  );
}
