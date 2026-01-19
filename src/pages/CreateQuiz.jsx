import { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import QuestionTypeModal from "../components/QuestionTypeModal";

export default function CreateQuiz() {
  const [showModal, setShowModal] = useState(true);
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState("");

  const addOption = () => setOptions([...options, ""]);

  const saveQuestion = () => {
    if (options.length < 2) {
      alert("Atleast two option required to save question");
      return;
    }

    const questions = JSON.parse(localStorage.getItem("question")) || [];
    questions.push({ options, correct });
    localStorage.setItem("question", JSON.stringify(questions));
    alert("Question created successfully");
  };

  return (
    <>
      <QuestionTypeModal
        open={showModal}
        onSelect={() => setShowModal(false)}
      />

      <TextField fullWidth label="Quiz Title" margin="normal" />
      <TextField fullWidth label="Question" margin="normal" />

      <Button onClick={addOption}>Add Option</Button>

      {options.map((opt, i) => (
        <TextField key={i} disabled value={opt || `Option ${i + 1}`} />
      ))}

      <TextField
        select
        label="Correct Answer"
        value={correct}
        onChange={(e) => setCorrect(e.target.value)}
      >
        {options.map((_, i) => (
          <MenuItem key={i} value={i + 1}>
            Option {i + 1}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={saveQuestion}>
        Save
      </Button>
    </>
  );
}