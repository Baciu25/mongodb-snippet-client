import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
export default function SnippetDetail() {
  // get id from params
  let { snippet_id } = useParams();
  return (
    <>
      <p>{snippet_id}</p>
    </>
  );
}
