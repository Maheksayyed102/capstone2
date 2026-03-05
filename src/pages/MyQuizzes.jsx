import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Switch,
  Typography
} from "@mui/material";
import { getQuestions, deleteQuestion } from "../utils/localStorage";

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const data = getQuestions() || [];
    setQuizzes(data);
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteQuestion(index);
      setQuizzes(getQuestions() || []);
    }
  };

  if (quizzes.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        No quizzes available.
      </Typography>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {quizzes.map((q, i) => (
          <TableRow key={i}>
            <TableCell>{q.title || `Quiz ${i + 1}`}</TableCell>

            <TableCell>
              <Switch checked={true} />
            </TableCell>

            <TableCell>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(i)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}