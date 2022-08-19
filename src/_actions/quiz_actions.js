import axios from "axios";
import { GET_QUESTIONS, GET_MARK, GET_LOGS } from "./types";
import { QUESTION_SERVER } from "../pages/Config.js";

export function getQuestions(dispatch) {
  
  axios
    .get(`${QUESTION_SERVER}`)
    .then((response) => {
      dispatch({
        type: GET_QUESTIONS,
        payload:response.data
      })
    });
}

export function sendAnswers(data) {
  const request = axios
    .post(`${QUESTION_SERVER}/mark`, data)
    .then((response) => response.data);

  return {
    type: GET_MARK,
    payload: request,
  };
}

export function getLogs() {
  const request = axios
    .get(`${QUESTION_SERVER}/logs`)
    .then((response) => response.data);

  return {
    type: GET_LOGS,
    payload: request,
  };
}