import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();

  if (!state) return <p>No Result</p>;

  return (
    <>
      <h2>Quiz Result</h2>
      <p>
        Score: {state.score} / {state.total}
      </p>
    </>
  );
}