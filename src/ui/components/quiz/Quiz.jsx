import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";

import { QuizContext } from "../../../core/context/Context.jsx";
import { useAuthGuard } from "../../../core/hooks/useAuthGuard.js";
import { QuizHeader } from "./header/QuizHeader.jsx";
import { QuizColumns } from "./questions/QuizColumns.jsx";
import { QuizFooter } from "./footer/QuizFooter.jsx";
import { ScoreBurst } from "./effects/ScoreBurst.jsx";
import { ComboBurst } from "./effects/ComboBurst.jsx";

const Quiz = () => {
  const {
    questions,
    score,
    streak,
    isQuizFinished,
    sessionId,
    completedSessionId,
    startQuiz,
    finishQuiz,
    wasStarted,
    isRunning,
  } = useContext(QuizContext);

  useAuthGuard();
  const navigate = useNavigate();

  // при завершении квиза — на результат
  useEffect(() => {
    if (isQuizFinished && completedSessionId === sessionId) {
      navigate("/result");
    }
  }, [completedSessionId, isQuizFinished, navigate, sessionId]);

  // храним актуальные значения флагов в ref,
  // чтобы корректно завершать тест только при размонтировании компонента
  const wasStartedRef = useRef(wasStarted);
  const isRunningRef = useRef(isRunning);
  const isQuizFinishedRef = useRef(isQuizFinished);

  useEffect(() => {
    wasStartedRef.current = wasStarted;
  }, [wasStarted]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    isQuizFinishedRef.current = isQuizFinished;
  }, [isQuizFinished]);

  // авто-завершение при уходе со страницы квиза (unmount)
  useEffect(() => {
    return () => {
      if (
        wasStartedRef.current &&
        isRunningRef.current &&
        !isQuizFinishedRef.current
      ) {
        finishQuiz();
      }
    };
  }, [finishQuiz]);

  const totalWords = useMemo(() => questions.length * 2, [questions]);


  // локальное состояние для "Начать" + отсчёт
  const [hasStarted, setHasStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleStart = () => {
    if (hasStarted) {
      return;
    }
    setHasStarted(true);
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) {
      return;
    }

    if (countdown === 0) {
      setCountdown(null);
      startQuiz();
      return;
    }

    const timeoutId = setTimeout(
      () => setCountdown((prev) => prev - 1),
      1000,
    );

    return () => clearTimeout(timeoutId);
  }, [countdown, startQuiz]);

  // анимация "+1" по изменению score
  const [showBurst, setShowBurst] = useState(false);
  const prevScoreRef = useRef(score);

  useEffect(() => {
    if (score > prevScoreRef.current) {
      setShowBurst(true);
      const timeoutId = setTimeout(() => {
        setShowBurst(false);
      }, 600);
      prevScoreRef.current = score;
      return () => clearTimeout(timeoutId);
    }

    prevScoreRef.current = score;
    return undefined;
  }, [score]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm p-4 page-card">
            <CardBody>
              <ScoreBurst visible={showBurst} />
              <ComboBurst streak={streak} />

              <QuizHeader
                hasStarted={hasStarted}
                countdown={countdown}
                onStart={handleStart}
              />

              <QuizColumns hasStarted={hasStarted} />

              <QuizFooter totalWords={totalWords} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { Quiz };
