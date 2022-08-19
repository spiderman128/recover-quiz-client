import { GET_LOGS, GET_MARK, GET_QUESTIONS } from "../_actions/types";

const initialState = {
  questions: [],
  mark: 0,
  answers: [],
  logs: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload 
      };
    case GET_MARK:
      return {
        ...state,
        mark: action.payload.mark,
        answers: action.payload.subjects
      }
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload
      }
    default:
      return state;
  }
}