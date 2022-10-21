// Admin route
const { Router } = require("express");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Student = require("../models/Student");

const router = Router();

// admin login page
router.get("/admin/login", async (req, res, next) => {
  try {
    res.status(200).render("admin/admin", {
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// All questions
router.get("/questions", async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.status(200).render("admin/all-question", { questions });
  } catch (error) {
    next(error);
  }
});

// Delete question
router.get("/delete/question/:id", async (req, res, next) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(301).redirect("/questions");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
});

// Delete student
router.get("/delete/student/:id", async (req, res, next) => {
  try {
    await Answer.deleteMany({ user: req.params.id });
    await Student.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(301).redirect("/all_students");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
});

// View Result
router.get("/view/:id", async (req, res, next) => {
  try {
    const answer = await Answer.findOne({ user: req.params.id });
    res.status(200).render("admin/view", { answer });
  } catch (error) {
    next(error);
  }
});

//GET: add student page
router.get("/add_student", async (req, res, next) => {
  try {
    res.status(200).render("admin/add-student", {
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

//GET: set exam page
router.get("/set_exam", async (req, res, next) => {
  try {
    res.status(200).render("admin/set-exam", {
      number: null,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

//GET: all students page
router.get("/all_students", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).render("admin/all-students", {
      students,
    });
  } catch (error) {
    next(error);
  }
});

//GET: get all students result page
router.get("/get_result", async (req, res, next) => {
  try {
    const students = await Answer.find().populate("user");
    res.status(200).render("admin/get-result", {
      students,
    });
  } catch (error) {
    next(error);
  }
});

//GET: about us page
router.get("/about", async (req, res, next) => {
  try {
    res.status(200).render("admin/about");
  } catch (error) {
    next(error);
  }
});

// POST: authentication
router.post("/auth", async (req, res, next) => {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      res.status(200).render("admin/admin", {
        error: "Credentials are required!",
      });
      return;
    }

    if (adminId === "1" && password === "1") {
      res.status(301).redirect("/dashboard");
      return;
    } else {
      res.status(200).render("admin/admin", {
        error: "Invalid credentials",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
});

// POST: register/add student route
router.post("/register", async (req, res, next) => {
  try {
    const { fname, lname, matnumber, dept, level } = req.body;

    if (!fname || !lname || !matnumber || !dept || !level) {
      res.status(400).render("admin/add-student", {
        error: "Credentials are required!",
      });
    }

    // check if matnumber have not exit in the DB before
    const check = await Student.findOne({ matnumber });
    if (check) {
      res.status(400).render("admin/add-student", {
        error: "Account already exit",
      });
    }

    // save into DB
    await Student.create(req.body)
      .then(() => {
        res.status(200).render("admin/add-student", {
          error: "Account created!",
        });
      })
      .catch((error) => {
        res.status(400).render("admin/add-student", {
          error:
            "An error occured while creating account please try again later",
        });
      });
  } catch (error) {
    next(error);
  }
});

// GET: generate question form  route
router.get("/form_generate", async (req, res, next) => {
  try {
    const number = req.query.generate;
    res.status(200).render("admin/set-exam", {
      number,
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

//POST: save the questions the db
router.post("/questions", async (req, res, next) => {
  try {
    // set question
    await Question.create(req.body)
      .then(() => {
        console.log("Added");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
});

// admin dashboard
router.get("/dashboard", async (req, res, next) => {
  res.status(200).render("admin/dashboard");
});

module.exports = router;
