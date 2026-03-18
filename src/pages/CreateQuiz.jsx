import { useState } from "react";
import {
  Button,
  TextField,
  Card,
  Typography,
  Box,
  Checkbox,
  Radio,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import QuestionTypeModal from "../components/QuestionTypeModal";
import { useNavigate } from "react-router-dom";
import bgImage from "../images/main-bg.jpg";

export default function CreateQuiz() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(true);
  const [questionType, setQuestionType] = useState("");

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const [correctText, setCorrectText] = useState("");

  const [options, setOptions] = useState(["", ""]);
  const [correct, setCorrect] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  const questionNumber = questionsList.length + 1;

  const addOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);

    if (questionType === "single") {
      if (correct === index) setCorrect("");
    }

    if (questionType === "multi") {
      setCorrect((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleQuestionChange = (value) => {
    setQuestion(value);
  };

  const addQuestionToList = () => {

    if (!questionType) {
      setShowModal(true);
      return;
    }

    if (!title.trim() || !question.trim()) {
      alert("Title and Question required");
      return;
    }

    if (questionType === "single" || questionType === "multi") {

      if (options.some((o) => !o.trim())) {
        alert("Fill all options");
        return;
      }

      if (
        (questionType === "single" && correct === "") ||
        (questionType === "multi" && correct.length === 0)
      ) {
        alert("Select correct answer");
        return;
      }
    }

    if (questionType === "short" || questionType === "descriptive") {

      const words = correctText.trim()
        ? correctText.trim().split(/\s+/)
        : [];

      if (!correctText.trim()) {
        alert("Correct answer is required");
        return;
      }

      if (questionType === "short") {
        if (words.length < 20 || words.length > 30) {
          alert("Short answer must be between 20 to 30 words");
          return;
        }
      }

      if (questionType === "descriptive") {
        if (words.length < 100 || words.length > 200) {
          alert("Descriptive answer must be between 100 to 200 words");
          return;
        }
      }
    }

    const newQuestion = {
      title,
      question,
      options,
      correct,
      correctText,
      questionType
    };

    setQuestionsList([...questionsList, newQuestion]);

    setQuestion("");
    setCorrectText("");
    setOptions(["", ""]);
    setCorrect("");

    setQuestionType("");
    setShowModal(true);
  };

  const clearQuestion = () => {
    setQuestion("");
    setCorrectText("");
    setOptions(["", ""]);
    setCorrect("");
  };

  const removeQuestionFromList = (index) => {

    const updated = questionsList.filter((_, i) => i !== index);
    setQuestionsList(updated);

    setQuestion("");
    setCorrectText("");
    setOptions(["", ""]);
    setCorrect("");

    setQuestionType("");
    setShowModal(true);
  };

  const submitAllQuestions = () => {

    if (!questionsList.length) {
      alert("Add at least one question");
      return;
    }

    localStorage.setItem("question", JSON.stringify(questionsList));

    setQuestionsList([]);
    setTitle("");
    clearQuestion();

    setQuestionType("");
    setShowModal(true);

    alert("Quiz created successfully!");
    navigate("/");
  };

  return (

<Box
  sx={{
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    py: 6,
  }}
>

<QuestionTypeModal
  open={showModal}
  value={questionType}

  onClose={() => {
    if (!questionType) return;
    setShowModal(false);
  }}

  onSelect={(data) => {

    if (!data?.type) return;

    setQuestionType(data.type);
    setCorrect(data.type === "multi" ? [] : "");
    setShowModal(false);
  }}
/>

<Card
  sx={{
    width: "100%",
    maxWidth: 900,
    maxHeight: "85vh",
    overflowY: "auto",
    borderRadius: 5,
    p: 5,
    background: "rgba(255,255,255,0.9)",
  }}
>

<Typography variant="h4" fontWeight={700}>
Create Question {questionNumber}
</Typography>

<Typography variant="body2" mb={3}>
  Question Type:
  <strong style={{ color: questionType ? "green" : "red" }}>
    {questionType ? questionType.toUpperCase() : " NOT SELECTED"}
  </strong>
</Typography>

<Divider sx={{ mb: 3 }} />

<TextField
fullWidth
label="Quiz Title"
value={title}
disabled={questionsList.length > 0}
onChange={(e) => setTitle(e.target.value)}
sx={{ mb: 3 }}
/>

<TextField
fullWidth
multiline
rows={3}
label={`Enter Question ${questionNumber}`}
value={question}
onChange={(e) => handleQuestionChange(e.target.value)}
sx={{ mb: 3 }}
/>

{(questionType === "short" || questionType === "descriptive") && (

<TextField
fullWidth
label="Enter Correct Answer"
value={correctText}
onChange={(e) => {

  const value = e.target.value;
  const words = value.trim() ? value.trim().split(/\s+/) : [];

  if (questionType === "short") {
    if (words.length > 30) {
      alert("Short answer cannot exceed 30 words");
      return;
    }
  }

  if (questionType === "descriptive") {
    if (words.length > 200) {
      alert("Descriptive answer cannot exceed 200 words");
      return;
    }
  }

  setCorrectText(value);
}}
sx={{ mb: 3 }}
/>

)}

{(questionType === "single" || questionType === "multi") && (

<>

<Typography fontWeight={500} mb={2}>
Options
</Typography>

<Stack spacing={2}>

{options.map((opt, i) => {

const isSelected =
questionType === "single"
? correct === i
: Array.isArray(correct) && correct.includes(i);

return (

<Card key={i} sx={{ p: 2 }}>

<Box display="flex" alignItems="center">

{questionType === "single" ? (

<Radio
checked={isSelected}
onClick={() =>
setCorrect(isSelected ? "" : i)
}
/>

) : (

<Checkbox
checked={isSelected}
onClick={() => {
if (isSelected)
setCorrect((prev) => prev.filter((c) => c !== i));
else
setCorrect((prev) => [...prev, i]);
}}
/>

)}

<TextField
fullWidth
label={`Option ${i + 1}`}
value={opt}
onChange={(e) =>
handleOptionChange(i, e.target.value)
}
/>

{options.length > 2 && (

<Button
color="error"
onClick={() => removeOption(i)}
>
<DeleteIcon />
</Button>

)}

{isSelected && (

<Chip
icon={<CheckCircleIcon />}
label="Correct"
color="primary"
size="small"
/>

)}

</Box>

</Card>

);

})}

</Stack>

<Button
startIcon={<AddIcon />}
onClick={addOption}
disabled={options.length >= 4}
sx={{ mt: 2 }}
>
Add Option
</Button>

</>

)}

<Divider sx={{ my: 4 }} />

<Stack direction="row" spacing={2}>

<Button
variant="contained"
color="error"
fullWidth
onClick={clearQuestion}
>
Clear
</Button>

<Button
variant="contained"
fullWidth
onClick={addQuestionToList}
>
Add Question
</Button>

</Stack>

{questionsList.length > 0 && (

<>
<Divider sx={{ my: 4 }} />

<Typography variant="h6">
Added Questions
</Typography>

<Stack spacing={3}>

{questionsList.map((q, index) => (

<Card key={index} sx={{ p: 3 }}>

<Box display="flex" justifyContent="space-between">

<Typography fontWeight={600}>
{index + 1}. {q.question}
</Typography>

<Button
color="error"
onClick={() => removeQuestionFromList(index)}
>
Remove
</Button>

</Box>

{(q.questionType === "single" || q.questionType === "multi") && (

<Stack spacing={1} mt={2}>

{q.options.map((opt, i) => {

const isCorrect =
q.questionType === "single"
? q.correct === i
: q.correct.includes(i);

return (

<Typography key={i}>
{i + 1}. {opt} {isCorrect && "✔"}
</Typography>

);

})}

</Stack>

)}

{(q.questionType === "short" || q.questionType === "descriptive") && (

<Box mt={2}>
<Typography>
<strong>Correct Answer:</strong> {q.correctText}
</Typography>
</Box>

)}

</Card>

))}

</Stack>

<Button
variant="contained"
color="success"
fullWidth
sx={{ mt: 3 }}
onClick={submitAllQuestions}
>
Save Quiz
</Button>

</>

)}

</Card>

</Box>

);
}