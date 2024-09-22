import { removePunctuation } from "./helper-functions";

export function validateAnswer(answer, val) {
  const formattedAnswer = removePunctuation((answer).toLowerCase());
  const formattedValue = removePunctuation((val).toLowerCase());

  if (formattedAnswer === formattedValue) {
    return true
  } else {
    return false
  }
}