import { useState } from "react";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  LinearProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../utils/localStorage";
import bgImage from "../images/main-bg.jpg";

export default function PlayQuiz() {
  const navigate = useNavigate();
  const questions = getQuestions();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  const [answeredCount, setAnsweredCount] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);

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

  const current = questions[index];

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [index]: value };
    setAnswers(newAnswers);
    setSelected(value);
    setAnsweredCount(Object.keys(newAnswers).length);
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(answers).forEach((i) => {
      const ans = answers[i];
      if (parseInt(ans) - 1 === questions[i].correct) score += 1;
    });
    return score;
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(answers[index + 1] || "");
    } else {
      setOpenConfirm(true); // Open confirmation dialog
    }
  };

  const handlePrevious = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelected(answers[index - 1] || "");
  };

  const handleConfirmSubmit = () => {
    navigate("/result", {
      state: { score: calculateScore(), total: questions.length }
    });
  };

  const handleCancelSubmit = () => {
    setOpenConfirm(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.2)"
        }
      }}
    >
      <Paper
        elevation={15}
        sx={{
          position: "relative",
          maxWidth: 700,
          width: "100%",
          p: 5,
          borderRadius: 5,
          bgcolor: "rgba(255,255,255,0.97)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.25)"
        }}
      >
        {/* Headline */}
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "700",
            textAlign: "center",
            background: "linear-gradient(to right, #ff6b6b, #f8e71c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Question {index + 1} of {questions.length}
        </Typography>

        {/* Question */}
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: "500",
            textAlign: "center",
            color: "#333"
          }}
        >
          {current.question}
        </Typography>

        {/* Options */}
        <RadioGroup
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
          sx={{ mb: 4 }}
        >
          {current.options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={(i + 1).toString()}
              control={<Radio sx={{ color: "#6a11cb", "&.Mui-checked": { color: "#ff6b6b" } }} />}
              label={opt}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 3,
                border: "1px solid #ddd",
                transition: "all 0.2s ease",
                backgroundColor: selected === (i + 1).toString() ? "rgba(255,107,107,0.1)" : "#fff",
                "&:hover": { bgcolor: "rgba(102,126,234,0.1)", transform: "scale(1.02)" },
                boxShadow:
                  selected === (i + 1).toString()
                    ? "0 4px 12px rgba(255,107,107,0.3)"
                    : "none"
              }}
            />
          ))}
        </RadioGroup>

        {/* Progress */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={(answeredCount / questions.length) * 100}
            sx={{
              flex: 1,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(to right, #ff6b6b, #f8e71c)"
              }
            }}
          />
          <Typography variant="body1" sx={{ minWidth: 40, ml: 2 }}>
            {answeredCount}/{questions.length}
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            disabled={index === 0}
            onClick={handlePrevious}
            sx={{
              py: 1.5,
              width: "48%",
              fontWeight: "bold",
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "#fff",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              py: 1.5,
              width: "48%",
              fontWeight: "bold",
              background: "linear-gradient(to right, #ff6b6b, #f8e71c)",
              color: "#fff",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            {index + 1 === questions.length ? "Finish Quiz" : "Next"}
          </Button>
        </Box>
      </Paper>

      {/* Confirmation Dialog with progress bar */}
      <Dialog open={openConfirm} onClose={handleCancelSubmit}>
        <DialogTitle>Submit Quiz?</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            You have answered {answeredCount} out of {questions.length} questions.
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(answeredCount / questions.length) * 100}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(to right, #ff6b6b, #f8e71c)"
              }
            }}
          />
          {answeredCount < questions.length && (
            <Typography mt={2} color="error">
              Some questions are still unanswered!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}