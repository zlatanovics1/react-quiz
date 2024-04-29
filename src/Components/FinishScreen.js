import { useAppContext } from "../contexts/AppContext";

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useAppContext();
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">Highscore: {highscore}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
}

export default FinishScreen;
