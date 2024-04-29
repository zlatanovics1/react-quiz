import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  questions: [],

  // loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: Number(JSON.parse(localStorage.getItem("score"))),
  timerOn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", timerOn: true };
    case "answer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          Number(question.correctOption === action.payload) * question.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      const hasBiggerScore = state.points > state.highscore;

      if (hasBiggerScore) {
        localStorage.setItem("score", JSON.stringify(state.points));
      }
      return {
        ...state,
        highscore: hasBiggerScore ? state.points : state.highscore,
        status: "finished",
        timerOn: false,
      };

    case "reset":
      return { ...initialState, status: "ready", questions: state.questions };
    default:
      throw new Error("Invalid action!");
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((acc, cur) => acc + cur.points, 0);
  return (
    <AppContext.Provider
      value={{ ...state, numQuestions, maxPoints, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("App Context used outside of AppProvider!");
  return context;
}

export { AppProvider, useAppContext };
