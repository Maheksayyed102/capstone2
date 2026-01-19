import { SET_QUIZZES, SET_CURRENT_QUIZ, SET_SCORE } from "../actions/quizActions";

const initialState = {
  quizzes: [],
  currentQuiz: null,
  score: 0,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZZES:
      return { ...state, quizzes: action.payload };

    case SET_CURRENT_QUIZ:
      return { ...state, currentQuiz: action.payload };

    case SET_SCORE:
      return { ...state, score: action.payload };

    default:
      return state;
  }
};

export default quizReducer;
