let options;
function Question({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  options = hasAnswered
    ? options || question.options
    : question.options.slice().sort(() => Math.random() - 0.5);
  const correctEl = question.options[question.correctOption];
  const correctOption = options.findIndex((el) => el === correctEl);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {options.map((option, i) => (
          <button
            className={`btn btn-option ${answer === i ? "answer" : ""} ${
              hasAnswered ? (i === correctOption ? "correct" : "wrong") : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "answer", payload: i })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
