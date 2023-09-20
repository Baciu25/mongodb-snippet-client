import SnippetCreationForm from "./SnippetCreationForm";
import SnippetList from "./SnippetList";

const Home = () => {
  return (
    <>
      <h1>Welcome to code dumpster</h1>
      <SnippetCreationForm />
      <SnippetList />
    </>
  );
};

export default Home;
