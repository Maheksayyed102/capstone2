import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Radio,
  FormControlLabel,
  Typography,
  LinearProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../utils/localStorage";
import bgImage from "../images/main-bg.jpg";

export default function PlayQuiz() {
  const navigate = useNavigate();
  const questions = getQuestions();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [multiSelected, setMultiSelected] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  // ✅ Disable body scroll (important)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!questions || questions.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5" mb={2}>
          No active quizzes available.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Back to Start
        </Button>
      </Box>
    );
  }

  const raw = questions[index];
  const current = {
    question: raw.question,
    type: (raw.type || raw.questionType || "").toLowerCase(),
    options:
      raw.options ||
      [raw.option1, raw.option2, raw.option3, raw.option4].filter(Boolean),
    correct: raw.correct
  };

  const optionLabels = ["A", "B", "C", "D"];

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case "single":
        return "Single Choice";
      case "multi":
        return "Multiple Choice";
      case "short":
        return "Short Answer";
      case "descriptive":
        return "Long Answer";
      default:
        return "Unknown Type";
    }
  };

  const saveAnswer = (value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSelect = (value) => {
    setSelected(value);
    saveAnswer(value);
  };

  const handleMultiSelect = (value) => {
    let updated = [...multiSelected];
    updated.includes(value)
      ? (updated = updated.filter((v) => v !== value))
      : updated.push(value);

    setMultiSelected(updated);
    saveAnswer(updated);
  };

  const handleTextChange = (value) => {
    setTextAnswer(value);
    saveAnswer(value);
  };

  const loadAnswer = (qIndex) => {
    const ans = answers[qIndex];
    const q = questions[qIndex];
    const type = (q.type || q.questionType || "").toLowerCase();

    if (!ans) {
      setSelected("");
      setMultiSelected([]);
      setTextAnswer("");
      return;
    }

    if (type === "single") {
      setSelected(ans);
      setMultiSelected([]);
      setTextAnswer("");
    } else if (type === "multi") {
      setMultiSelected(ans);
      setSelected("");
      setTextAnswer("");
    } else {
      setTextAnswer(ans);
      setSelected("");
      setMultiSelected([]);
    }
  };

  const calculateScore = () => {
    let score = 0;

    Object.keys(answers).forEach((i) => {
      const q = questions[i];
      const ans = answers[i];
      const type = (q.type || q.questionType || "").toLowerCase();

      if (type === "single") {
        if (parseInt(ans) - 1 === q.correct) score++;
      } else if (type === "multi") {
        const correctAnswers = Array.isArray(q.correct)
          ? q.correct.map(String)
          : [];
        if (
          Array.isArray(ans) &&
          ans.length === correctAnswers.length &&
          ans.every((a) => correctAnswers.includes(a))
        ) {
          score++;
        }
      }
    });

    return score;
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      loadAnswer(nextIndex);
    } else {
      setOpenConfirm(true);
    }
  };

  const handlePrevious = () => {
    if (index === 0) return;
    const prevIndex = index - 1;
    setIndex(prevIndex);
    loadAnswer(prevIndex);
  };

  const handleConfirmSubmit = () => {
    navigate("/result", {
      state: { score: calculateScore(), total: questions.length }
    });
  };

  const answeredCount = Object.values(answers).filter((ans) => {
    if (Array.isArray(ans)) return ans.length > 0;
    return ans !== "" && ans !== null && ans !== undefined;
  }).length;

  return (
    <Box
      sx={{
        position: "fixed",   // ✅ FULLSCREEN (removes navbar effect)
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 720,
          maxHeight: "90vh",
          width: "100%",
          p: 4,
          borderRadius: 3,
          bgcolor: "#ffffff",
          overflowY: "auto"
        }}
      >
        <Typography variant="h5" mb={1} fontWeight="bold">
          Question {index + 1} of {questions.length}
        </Typography>

        <Typography mb={3} color="text.secondary">
          {getQuestionTypeLabel(current.type)}
        </Typography>

        <Typography variant="h6" mb={3}>
          {current.question}
        </Typography>

        {/* OPTIONS */}
        <Box display="flex" flexDirection="column" gap={2}>
          {current.type === "single" &&
            current.options?.map((opt, i) => (
              <Box
                key={i}
                onClick={() => handleSelect((i + 1).toString())}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #ddd",
                  backgroundColor:
                    selected === (i + 1).toString() ? "#e0f7fa" : "#fafafa",
                  cursor: "pointer"
                }}
              >
                <FormControlLabel
                  sx={{ width: "100%", m: 0 }}
                  control={
                    <Radio checked={selected === (i + 1).toString()} />
                  }
                  label={`${optionLabels[i]}. ${opt}`}
                />
              </Box>
            ))}

          {current.type === "multi" &&
            current.options?.map((opt, i) => (
              <Box
                key={i}
                onClick={() => handleMultiSelect((i + 1).toString())}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #ddd",
                  backgroundColor: multiSelected.includes(
                    (i + 1).toString()
                  )
                    ? "#e8f5e9"
                    : "#fafafa",
                  cursor: "pointer"
                }}
              >
                <FormControlLabel
                  sx={{ width: "100%", m: 0 }}
                  control={
                    <Checkbox
                      checked={multiSelected.includes(
                        (i + 1).toString()
                      )}
                    />
                  }
                  label={`${optionLabels[i]}. ${opt}`}
                />
              </Box>
            ))}

          {(current.type === "short" || current.type === "descriptive") && (
            <TextField
              fullWidth
              multiline={current.type === "descriptive"}
              rows={current.type === "descriptive" ? 4 : 1}
              value={textAnswer}
              onChange={(e) => handleTextChange(e.target.value)}
            />
          )}
        </Box>

        <Box mt={4}>
          <LinearProgress
            variant="determinate"
            value={(answeredCount / questions.length) * 100}
          />
          <Typography textAlign="right" mt={1}>
            {answeredCount}/{questions.length} answered
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            disabled={index === 0}
            onClick={handlePrevious}
          >
            Previous
          </Button>

          <Button variant="contained" onClick={handleNext}>
            {index + 1 === questions.length ? "Finish" : "Next"}
          </Button>
        </Box>
      </Paper>

      <Dialog open={openConfirm}>
        <DialogTitle>Submit Quiz?</DialogTitle>
        <DialogContent>
          <Typography>
            You answered {answeredCount} out of {questions.length}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>No</Button>
          <Button onClick={handleConfirmSubmit} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}