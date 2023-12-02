const express = require("express");
const router = express.Router();


const {registerStar,getStars,getStar} = require("../controllers/stars");

router.post("/stars", registerStar)
router.get("/stars", getStars)
router.get("/stars/:id", getStar)
// router.post("/sendtoopenaiforfinal" ,sendToOpenAIForFinal)

module.exports = router;