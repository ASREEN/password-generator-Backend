const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/rootController");

router.
route('/api/generate/passwords/v1').
post( passwordController.generatePasswords);

module.exports = router;