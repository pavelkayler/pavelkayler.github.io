import { Result } from "../../components/result/Result.jsx";
import { Topics } from "../../components/topics/Topics.jsx";
import { AppLayout } from "../../layouts/AppLayout.jsx";

const ResultPage = () => {
  return (
    <AppLayout>
      <Result />
      <Topics />
    </AppLayout>
  );
};

export default ResultPage;
