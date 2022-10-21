// Student route
const { Router } = require("express");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Student = require("../models/Student");

const router = Router();

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { matnumber } = req.body;

    if (!matnumber) {
      res.status(400).render("index", {
        error: "Matric number is required!",
      });
    }

    // check if matnumber exit
    const check = await Student.findOne({ matnumber });

    if (check) {
      res.status(301).redirect(`/student-welcome/${check._id}`);
    } else {
      res.status(200).render("index", {
        error: "Invalid matric number",
      });
    }
  } catch (error) {
    next(error);
  }
});

// Info page
router.get("/student-welcome/:id", async (req, res, next) => {
  try {
    // fetch the id info
    const info = await Student.findById(req.params.id);
    res.status(200).render("student/student-welcome", {
      info,
    });
  } catch (error) {
    next(error);
  }
});

// Start exam
router.get("/start", async (req, res, next) => {
  try {
    // fetch the id info
    const info = await Student.findOne({ matnumber: req.query.matnumber });
    const question = await Question.find();
    res.status(200).render("student/student-startexam", {
      info,
      question,
    });
  } catch (error) {
    next(error);
  }
});

// Submit exam
router.get("/next/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
  } catch (error) {
    next(error);
  }
});

// Submit exam
router.post("/submit", async (req, res, next) => {
  try {
    // find user
    const id = await Student.findOne({ matnumber: req.body.matnumber });
    if (!id) {
      res.status(400).send("Matric number does not exit");
      return;
    }

    // check if student has already submitted before
    const already = await Answer.findOne({ user: id._id });
    if (already) {
      res.status(400).send("You have already written this exam");
      return;
    }

    await Answer.create({
      user: id._id,
      question: req.body.question,
      answer: req.body.answer,
    })
      .then(() => {
        res.status(200).send("Answer submitted successfuly");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
