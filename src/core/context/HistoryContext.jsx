import { createContext, useMemo, useState } from "react";

const HistoryContext = createContext(null);

const HistoryProvider = ({ children }) => {
  const [quizHistory, setQuizHistory] = useState([]);

  const addQuizAttempt = (attempt) => {
    setQuizHistory((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...attempt,
      },
    ]);
  };

  const value = useMemo(
    () => ({
      quizHistory,
      addQuizAttempt,
    }),
    [quizHistory],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export { HistoryContext, HistoryProvider };
