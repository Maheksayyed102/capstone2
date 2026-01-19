import { useState } from "react";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { getQuestions } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function PlayQuiz() {
  const navigate = useNavigate();
  const questions = getQuestions();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) return <p>No active quizzes</p>;

  const current = questions[index];

  const next = () => {
    let newScore = score;
    if (parseInt(selected) === current.correct) {
      newScore += 1;
    }

    setScore(newScore); // update state

    setSelected("");
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      navigate("/result", { state: { score: newScore, total: questions.length } });
    }
  };

  return (
    <>
      <h3>{current.question}</h3>

      <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
        {current.options.map((opt, i) => (
          <FormControlLabel
            key={i}
            value={(i + 1).toString()}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>

      <Button variant="contained" disabled={!selected} onClick={next}>
        Next Question
      </Button>
    </>
  );
}
