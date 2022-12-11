const express = require("express");
const {
  generateImage,
  generateTalk,
} = require("../controllers/openaiController");
const router = express.Router();

router.post("/generateimage", generateImage);
router.post("/generateTalk", generateTalk);

module.exports = router;
