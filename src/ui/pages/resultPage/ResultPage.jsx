import { Header } from "../../components/header/Header.jsx";
import { Result } from "../../components/result/Result.jsx";
import { Topics } from "../../components/topics/Topics.jsx";

const ResultPage = () => {
  return (
    <div className="app-shell">
      <Header />
      <Result />
      <Topics />
    </div>
  );
};

export default ResultPage;
