import express from "express";
import fs from "fs";

const router = express.Router();

function readScience() {
  const scienceData = fs.readFileSync("./data/science.json");
  const parsedData = JSON.parse(scienceData);
  return parsedData.science_trivia_questions;
}

function getScienceQuestion(question) {
  const science = readScience();
  return science.find((item) => item.question === question);
}

function getScienceAnswer(answer) {
  const science = readScience();
  return science.find((item) => item.answer === answer);
}

router.get("/", (req, res) => {
  const science = readScience();
  res.json(science);
});

router.get("/question/:question", (req, res) => {
  const question = req.params.question;
  const scienceQuestion = getScienceQuestion(question);
  if (scienceQuestion) {
    res.json(scienceQuestion);
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

router.get("/answer/:answer", (req, res) => {
  const answer = req.params.answer;
  const scienceAnswer = getScienceAnswer(answer);
  if (scienceAnswer) {
    res.json(scienceAnswer);
  } else {
    res.status(404).json({ error: "Answer not found" });
  }
});

export default router;
