export const SET_QUIZZES = "SET_QUIZZES";
export const SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ";
export const SET_SCORE = "SET_SCORE";

export const loadQuizzes = () => {
  return (dispatch) => {
    const data = JSON.parse(localStorage.getItem("question")) || [];
    dispatch({ type: SET_QUIZZES, payload: data });
  };
};

export const setCurrentQuiz = (quiz) => ({
  type: SET_CURRENT_QUIZ,
  payload: quiz,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});