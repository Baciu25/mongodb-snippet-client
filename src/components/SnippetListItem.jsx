import relativeDate from "../utils/relative-date";

export default function SnippetListItem({ snippet }) {
  return (
    <div className="flex flex-col space-y-1">
      <a
        href={`/${snippet.shortId}`}
        className="underline text-blue-500 hover:text-blue-800"
      >
        {snippet.title.substring(7) || "Untitled Snippet"}{" "}
      </a>

      <p className=" text-sm text-gray-500">
        {" "}
        {relativeDate(new Date(snippet.updatedAt))}
      </p>
    </div>
  );
}
