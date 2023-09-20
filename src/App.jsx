import { BrowserRouter, Routes, Route } from "react-router-dom";
import SnippetDetail from "./components/SnippetDetail";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>test</h1>} />
          <Route path="/:snippet_id" element={<SnippetDetail />} />
        </Routes>
      </BrowserRouter>

      <p className="read-the-docs">I'm on every page</p>
    </>
  );
}

export default App;
