import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { questions as baseQuestions } from "../data/questions.js";
import { UserContext } from "./UserContext.jsx";
import { HistoryContext } from "./HistoryContext.jsx";

const QuizContext = createContext(null);

const shuffleArray = (source) => {
  const array = source.slice();
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};

// левый столбик — английские слова, правый — русские
const createColumns = (pairs) => {
  const left = pairs.map((pair) => ({
    id: `left-${pair.id}`,
    pairId: pair.id,
    text: pair.left,
  }));

  const right = pairs.map((pair) => ({
    id: `right-${pair.id}`,
    pairId: pair.id,
    text: pair.right,
  }));

  return {
    leftItems: shuffleArray(left),
    rightItems: shuffleArray(right),
  };
};

// выбираем подсказку так, чтобы пара не повторялась подряд
const pickRandomPrompt = (columns, prevPairId = null) => {
  const { leftItems, rightItems } = columns;
  const allItems = [...leftItems, ...rightItems];

  if (allItems.length === 0) {
    return null;
  }

  if (allItems.length === 1) {
    const item = allItems[0];
    const side = item.id.startsWith("left-") ? "left" : "right";

    return {
      side,
      itemId: item.id,
      pairId: item.pairId,
      text: item.text,
    };
  }

  let item;

  do {
    const randomIndex = Math.floor(Math.random() * (allItems.length));
    item = allItems[randomIndex];
  } while (allItems.length > 1 && item.pairId === prevPairId);

  const side = item.id.startsWith("left-") ? "left" : "right";

  return {
    side,
    itemId: item.id,
    pairId: item.pairId,
    text: item.text,
  };
};

const QUIZ_DURATION_SECONDS = 5 * 60; // 5 минут

const initialColumns = createColumns(baseQuestions);

const QuizProvider = ({ children }) => {
  const { userName } = useContext(UserContext);
  const { addQuizAttempt } = useContext(HistoryContext);

  const [questions] = useState(baseQuestions);

  const [columns, setColumns] = useState(initialColumns);
  const { leftItems, rightItems } = columns;

  const [currentPrompt, setCurrentPrompt] = useState(null);

  const [score, setScore] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);

  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isRunRecorded, setIsRunRecorded] = useState(false);

  const [wasStarted, setWasStarted] = useState(false);
  const [isSelectionLocked, setIsSelectionLocked] = useState(false);

  const [feedback, setFeedback] = useState(null); // { side, itemId, result: 'correct' | 'wrong' }

  const [streak, setStreak] = useState(0); // количество подряд верных ответов

  // подготовка квиза (после выбора темы)
  const initQuiz = () => {
    const newColumns = createColumns(questions);

    setColumns(newColumns);
    setCurrentPrompt(null);

    setScore(0);
    setErrorsCount(0);
    setTimeLeft(QUIZ_DURATION_SECONDS);

    setIsRunning(false);
    setIsQuizFinished(false);
    setIsRunRecorded(false);

    setWasStarted(false);
    setIsSelectionLocked(false);
    setFeedback(null);
    setStreak(0);
  };

  // старт: первый рандом + включаем таймер
  const startQuiz = () => {
    if (wasStarted) {
      return;
    }

    setWasStarted(true);
    setIsRunning(true);

    setCurrentPrompt((prevPrompt) => {
      const prevPairId = prevPrompt ? prevPrompt.pairId : null;
      return pickRandomPrompt(columns, prevPairId);
    });
  };

  const resetCounters = () => {
    setScore(0);
    setErrorsCount(0);
    setStreak(0);
  };

  const finishQuiz = () => {
    if (!wasStarted || isQuizFinished) {
      return;
    }
    setIsQuizFinished(true);
    setIsRunning(false);
  };

  const handleItemClick = (side, itemId) => {
    if (!currentPrompt || !isRunning || isQuizFinished || isSelectionLocked) {
      return;
    }

    const { side: promptSide, pairId: promptPairId } = currentPrompt;

    // нельзя кликать в тот же столбец
    if (side === promptSide) {
      return;
    }

    const items = side === "left" ? leftItems : rightItems;
    const clickedItem = items.find((item) => item.id === itemId);

    if (!clickedItem) {
      return;
    }

    const isCorrect = clickedItem.pairId === promptPairId;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setErrorsCount((prev) => prev + 1);
      setStreak(0);
    }

    setFeedback({
      side,
      itemId,
      result: isCorrect ? "correct" : "wrong",
    });

    setIsSelectionLocked(true);

    setTimeout(() => {
      setCurrentPrompt((prevPrompt) => {
        const prevPairId = prevPrompt ? prevPrompt.pairId : null;
        return pickRandomPrompt(columns, prevPairId);
      });
      setFeedback(null);
      setIsSelectionLocked(false);
    }, 250);
  };

  // таймер
  useEffect(() => {
    if (!isRunning || isQuizFinished) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, isQuizFinished]);

  // авто-завершение по таймеру
  useEffect(() => {
    if (timeLeft === 0 && isRunning && !isQuizFinished) {
      setIsQuizFinished(true);
      setIsRunning(false);
    }
  }, [timeLeft, isRunning, isQuizFinished]);

  // запись попытки в историю (когда квиз завершён, только один раз)
  useEffect(() => {
    if (!isQuizFinished || isRunRecorded || !wasStarted) {
      return;
    }

    setIsRunRecorded(true);

    const durationSec = QUIZ_DURATION_SECONDS - timeLeft;

    addQuizAttempt({
      date: new Date().toISOString(),
      userName,
      correct: score,
      wrong: errorsCount,
      durationSec,
      streak,
    });
  }, [
    isQuizFinished,
    isRunRecorded,
    wasStarted,
    addQuizAttempt,
    userName,
    score,
    errorsCount,
    timeLeft,
    streak,
  ]);

  const value = useMemo(
    () => ({
      questions,
      leftItems,
      rightItems,
      currentPrompt,
      score,
      errorsCount,
      timeLeft,
      isRunning,
      isQuizFinished,
      wasStarted,
      feedback,
      streak,
      initQuiz,
      startQuiz,
      resetCounters,
      finishQuiz,
      handleItemClick,
    }),
    [
      questions,
      leftItems,
      rightItems,
      currentPrompt,
      score,
      errorsCount,
      timeLeft,
      isRunning,
      isQuizFinished,
      wasStarted,
      feedback,
      streak,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export { QuizContext, QuizProvider };
