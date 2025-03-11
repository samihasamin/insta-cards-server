import express from "express";
import fs from "fs";

const router = express.Router();

function readMath() {
  const mathData = fs.readFileSync("./data/math.json");
  const parsedData = JSON.parse(mathData);
  return parsedData.questions;
}

function getMathQuestion(question) {
  const math = readMath();
  return math.find((item) => item.question === question);
}

function getMathAnswer(answer) {
  const math = readMath();
  return math.find((item) => item.answer === answer);
}

router.get("/", (req, res) => {
  const math = readMath();
  res.json(math);
});

router.get("/question/:question", (req, res) => {
  const question = req.params.question;
  const mathQuestion = getMathQuestion(question);
  if (mathQuestion) {
    res.json(mathQuestion);
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

router.get("/answer/:answer", (req, res) => {
  const answer = req.params.answer;
  const mathAnswer = getMathAnswer(answer);
  if (mathAnswer) {
    res.json(mathAnswer);
  } else {
    res.status(404).json({ error: "Answer not found" });
  }
});

export default router;