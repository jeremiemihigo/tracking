const express = require("express");
const router = express.Router();

const { protect } = require("../MiddleWare/protect");
const { UpdateProcess } = require("../Controller/Process");

const { ReadRole, UpdateRole, AddMembers } = require("../Controller/Role");
const { resetPassword, Bloquer } = require("../Controller/Login");

const { AddmyStatus, ReadAgent } = require("../Controller/AgentAdmin");
const { EditStatus, ReadStatus } = require("../Controller/Status");
const { EditAction, DeleteAction } = require("../Controller/Action");

//AgentAdmin
router.put("/process", protect, UpdateProcess, ReadStatus);
router.put("/action", protect, EditAction, ReadStatus);
router.put("/deleteaction", protect, DeleteAction, ReadStatus);
//Status
router.put("/status", protect, EditStatus, ReadStatus);
router.put("/role", UpdateRole, ReadRole);
router.put("/addMember", protect, AddMembers, ReadRole);
//Reset password
router.put("/reset", protect, resetPassword);
router.put("/bloquer", protect, Bloquer);

router.put("/updateagent", protect, AddmyStatus, ReadAgent);

module.exports = router;
