import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const SECS_PER_QUESTION = 30;

function Timer() {
  const { dispatch, numQuestions } = useAppContext();
  const [time, setTime] = useState(SECS_PER_QUESTION * numQuestions);
  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  const secs = (time % 60).toString().padStart(2, 0);

  useEffect(function () {
    const timerID = setInterval(function () {
      if (time === 0) return dispatch({ type: "finish" });
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(timerID);
  });
  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
}

export default Timer;
