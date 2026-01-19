const KEY = "question";

export const getQuestions = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveQuestions = (questions) => {
  localStorage.setItem(KEY, JSON.stringify(questions));
};

export const deleteQuestion = (index) => {
  const questions = getQuestions();
  questions.splice(index, 1);
  saveQuestions(questions);
};

export const updateQuestion = (index, updatedQuestion) => {
  const questions = getQuestions();
  questions[index] = updatedQuestion;
  saveQuestions(questions);
};
