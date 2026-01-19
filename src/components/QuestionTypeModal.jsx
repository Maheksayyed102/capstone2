import { Dialog, DialogTitle, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function QuestionTypeModal({ open, onSelect }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Select Question Type</DialogTitle>
      <RadioGroup onChange={(e) => onSelect(e.target.value)}>
        <FormControlLabel value="single" control={<Radio />} label="MCQ (Single Correct)" />
        <FormControlLabel value="multi" control={<Radio />} label="MCQ (Multiple Correct)" />
        <FormControlLabel value="short" control={<Radio />} label="Short Answer" />
        <FormControlLabel value="desc" control={<Radio />} label="Description" />
      </RadioGroup>
    </Dialog>
  );
}