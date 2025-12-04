import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { History } from "../../components/history/History.jsx";
import { AppLayout } from "../../layouts/AppLayout.jsx";
import { UserContext } from "../../../core/context/Context.jsx";

const HistoryPage = () => {
  const { isAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const [navigationEntry] = performance.getEntriesByType("navigation");
    const isReload = navigationEntry?.type === "reload";

    if (isAuth && isReload) {
      navigate("/topics", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <AppLayout>
      <History />
    </AppLayout>
  );
};

export default HistoryPage;
