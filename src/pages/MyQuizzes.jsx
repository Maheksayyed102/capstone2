import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Switch
} from "@mui/material";
import { getQuestions, deleteQuestion } from "../utils/localStorage";

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(getQuestions());
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteQuestion(index);
      setQuizzes(getQuestions());
    }
  };

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
              <Switch defaultChecked />
            </TableCell>
            <TableCell>
              <Button color="error" onClick={() => handleDelete(i)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}