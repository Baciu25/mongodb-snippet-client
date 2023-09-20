import { BrowserRouter, Routes, Route } from "react-router-dom";
import SnippetDetail from "./components/SnippetDetail";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:snippet_id" element={<SnippetDetail />} />
        </Routes>
      </BrowserRouter>

      <p className="read-the-docs">I'm on every page</p>
    </>
  );
}

export default App;
