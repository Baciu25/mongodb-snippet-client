import relativeDate from "../utils/relative-date";

export default function SnippetListItem({ snippet }) {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      <a
        href={`/${snippet.shortId}`}
        className="underline text-blue-500 hover:text-blue-800"
      >
        {snippet.title || "Untitled Snippet"}{" "}
      </a>

      <p>{relativeDate(new Date(snippet.updatedAt))}</p>
    </div>
  );
}
