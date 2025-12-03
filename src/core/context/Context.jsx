import { UserProvider } from "./UserContext.jsx";
import { HistoryProvider } from "./HistoryContext.jsx";
import { QuizProvider } from "./QuizContext.jsx";

import { UserContext } from "./UserContext.jsx";
import { HistoryContext } from "./HistoryContext.jsx";
import { QuizContext } from "./QuizContext.jsx";

const ContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <HistoryProvider>
        <QuizProvider>{children}</QuizProvider>
      </HistoryProvider>
    </UserProvider>
  );
};

export { ContextProvider, UserContext, HistoryContext, QuizContext };
