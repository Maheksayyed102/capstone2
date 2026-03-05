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
    } else {
      setCorrect((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addQuestionToList = () => {
    if (!title.trim() || !question.trim()) return alert("Title and Question are required");
    if (options.some((o) => !o.trim())) return alert("Fill all options");
    if ((questionType === "single" && correct === "") || (questionType === "multi" && correct.length === 0))
      return alert("Select correct answer");

    const newQuestion = { title, question, options, correct, questionType };
    setQuestionsList([...questionsList, newQuestion]);

    setQuestion("");
    setOptions(["", ""]);
    setCorrect(questionType === "multi" ? [] : "");
    setQuestionType("");
    setShowModal(true);
  };

  const clearQuestion = () => {
    setQuestion("");
    setOptions(["", ""]);
    setCorrect(questionType === "multi" ? [] : "");
  };

  const removeQuestionFromList = (index) => {
    setQuestionsList(questionsList.filter((_, i) => i !== index));
  };

  const submitAllQuestions = () => {
    if (!questionsList.length) return alert("Add at least one question");

    localStorage.setItem("question", JSON.stringify(questionsList));

    // Clear state
    setQuestionsList([]);
    setTitle("");
    clearQuestion();
    setShowModal(true);

    // ✅ Show alert box
    alert("Quiz created successfully!");

    // Navigate to home page
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
        onSelect={(type) => {
          setQuestionType(type);
          setCorrect(type === "multi" ? [] : "");
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
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          Create Question {questionNumber}
        </Typography>

        <Typography variant="body2" mb={3}>
          Question Type: <strong>{questionType ? questionType.toUpperCase() : "Not Selected"}</strong>
        </Typography>

        <Divider sx={{ mb: 4 }} />

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
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Typography fontWeight={500} mb={2}>
          Options
        </Typography>

        <Stack spacing={2}>
          {options.map((opt, i) => {
            const isSelected = questionType === "single" ? correct === i : correct?.includes?.(i);
            return (
              <Card
                key={i}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: isSelected ? "2px solid #1976d2" : "1px solid rgba(0,0,0,0.1)",
                  backgroundColor: isSelected ? "rgba(25,118,210,0.08)" : "rgba(255,255,255,0.7)",
                }}
              >
                <Box display="flex" alignItems="center">
                  {questionType === "single" ? (
                    <Radio checked={isSelected} onChange={() => setCorrect(i)} />
                  ) : (
                    <Checkbox
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) setCorrect((prev) => prev.filter((c) => c !== i));
                        else setCorrect((prev) => [...prev, i]);
                      }}
                    />
                  )}

                  <TextField fullWidth value={opt} label={`Option ${i + 1}`} onChange={(e) => handleOptionChange(i, e.target.value)} />

                  {options.length > 2 && (
                    <Button color="error" onClick={() => removeOption(i)} sx={{ ml: 2 }}>
                      <DeleteIcon />
                    </Button>
                  )}

                  {isSelected && <Chip icon={<CheckCircleIcon />} label="Correct" color="primary" size="small" sx={{ ml: 2 }} />}
                </Box>
              </Card>
            );
          })}
        </Stack>

        <Button startIcon={<AddIcon />} onClick={addOption} disabled={options.length >= 4} sx={{ mt: 3 }}>
          Add Option
        </Button>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="error" fullWidth onClick={clearQuestion}>
            Clear
          </Button>

          <Button variant="contained" fullWidth onClick={addQuestionToList}>
            Add Question
          </Button>
        </Stack>

        {questionsList.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" mb={2}>
              Added Questions
            </Typography>

            <Stack spacing={3}>
              {questionsList.map((q, index) => (
                <Card key={index} sx={{ p: 3, borderRadius: 3 }}>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography fontWeight={600}>
                      {index + 1}. {q.question}
                    </Typography>

                    <Button size="small" color="error" onClick={() => removeQuestionFromList(index)}>
                      Remove
                    </Button>
                  </Box>

                  <Stack spacing={1}>
                    {q.options.map((opt, i) => {
                      const isCorrect = q.questionType === "single" ? q.correct === i : q.correct.includes(i);
                      return (
                        <Box
                          key={i}
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: isCorrect ? "rgba(76,175,80,0.15)" : "rgba(0,0,0,0.04)",
                            border: isCorrect ? "1px solid #4caf50" : "1px solid transparent",
                          }}
                        >
                          <Typography variant="body2">
                            {i + 1}. {opt}
                            {isCorrect && <Chip label="Correct" size="small" color="success" sx={{ ml: 1 }} />}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Card>
              ))}
            </Stack>

            <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} onClick={submitAllQuestions}>
              Save Quiz
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
}