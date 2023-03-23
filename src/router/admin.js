const express = require('express');
const adminController = require('../controller/admin.js');
const validateAdmin = require('../middelware/validate.admin');
const adminRequire = require('../middelware/admin.require');

const router = express.Router();

router.use(adminRequire)

router.get("/users", adminController.showAllUserLis);
router.post("/makeAdmin", validateAdmin.makeAdmin, adminController.makeAdmin)

module.exports = router;