import { useLocation, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, LinearProgress, Button } from "@mui/material";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No Result</p>;

  const { score, total } = state;
  const percent = (score / total) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        p: 2
      }}
    >
      <Paper
        elevation={15}
        sx={{
          maxWidth: 700,
          width: "100%",
          p: 5,
          borderRadius: 5,
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "700",
            background: "linear-gradient(to right, #ff6b6b, #f8e71c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Quiz Completed!
        </Typography>

        {/* Score + Progress */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "500", color: "#333" }}
          >
            You scored {score} / {total}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                flex: 1,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#eee",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(to right, #ff6b6b, #f8e71c)"
                }
              }}
            />
            <Typography variant="body1" sx={{ ml: 2, minWidth: 40 }}>
              {Math.round(percent)}%
            </Typography>
          </Box>
        </Box>

        {/* Single Button */}
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            py: 1.5,
            px: 4,
            fontWeight: "bold",
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "#fff",
            "&:hover": { transform: "scale(1.05)" }
          }}
        >
          Go Back to Home
        </Button>
      </Paper>
    </Box>
  );
}