import express from "express";
import fs from "fs";

const router = express.Router();

function readGeo() {
  const geoData = fs.readFileSync("./data/geo.json");
  const parsedData = JSON.parse(geoData);
  return parsedData.features;
}

function getGeoQuestion(question) {
  const geo = readGeo();
  return geo.find((feature) => feature.properties.question === question);
}

function getGeoAnswer(answer) {
  const geo = readGeo();
  return geo.find((feature) => feature.properties.answer === answer);
}

router.get("/", (req, res) => {
  const geo = readGeo();
  const questionsAndAnswers = geo.map((feature) => ({
    question: feature.properties.question,
    answer: feature.properties.answer,
  }));
  res.json(questionsAndAnswers);
});

router.get("/question/:question", (req, res) => {
  const question = req.params.question;
  const geoQuestion = getGeoQuestion(question);
  if (geoQuestion) {
    res.json({
      question: geoQuestion.properties.question,
      answer: geoQuestion.properties.answer,
    });
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

router.get("/answer/:answer", (req, res) => {
  const answer = req.params.answer;
  const geoAnswer = getGeoAnswer(answer);
  if (geoAnswer) {
    res.json({
      question: geoAnswer.properties.question,
      answer: geoAnswer.properties.answer,
    });
  } else {
    res.status(404).json({ error: "Answer not found" });
  }
});

export default router;
