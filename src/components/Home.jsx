import Editor from "./Editor";
import SnippetList from "./SnippetList";

const Home = () => {
  return (
    <>
      <Editor />
      <div className="fixed top-20 right-5">
        <SnippetList />
      </div>
    </>
  );
};

export default Home;
