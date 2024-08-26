const express = require("express");
const {
  ReadZBM,
  ReadAction,
  Read,
  ReadProcessOfficer,
  ReadCallOperator,
  ReadShopManager,
  ReadRS,
  ReadManagment,
  ReadClientDepartement,
} = require("../Controller/ReadClient");
const { protect } = require("../MiddleWare/protect");
const router = express.Router();

router.get("/zbm", protect, ReadAction, ReadZBM, Read);
router.get("/processofficer", protect, ReadAction, ReadProcessOfficer, Read);
router.get("/calloperator", protect, ReadAction, ReadCallOperator, Read);
router.get("/shopmanager", protect, ReadAction, ReadShopManager, Read);
router.get("/rs", protect, ReadAction, ReadRS, Read);

//FIELD, SYSTEM AND DATA, MANAGING DIRECTOR, SUPER USER
router.get("/field", protect, Read);
//CALL CENTER MANAGMENT, PORTOFOLIO MANAGMENT, FRAUD MANAGMENT
router.get("/managment_suivi", protect, ReadAction, ReadManagment, Read);

router.get("/departmentOne", protect, ReadClientDepartement, Read);

module.exports = router;
