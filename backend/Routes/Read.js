const express = require("express");
const router = express.Router();
const { protect, readUser } = require("../MiddleWare/protect");
const { ReadProcess } = require("../Controller/Process");
const { ReadStatus } = require("../Controller/Status");
const { ReadAgent } = require("../Controller/AgentAdmin");
const { ReadRole } = require("../Controller/Role");
const { ReadInitiale } = require("../Controller/Initiale");
const { RoleAttente } = require("../Controller/Analyse");
const { ReadData } = require("../Controller/DataToTrack");
const { ReadCorbeille } = require("../Controller/Client");

//AgentAdmin
router.get("/agent", protect, ReadAgent);
//Login
router.get("/user", readUser);
//Main process

router.get("/process", ReadProcess);
//Status
router.get("/status", protect, ReadStatus);
//Actions
//Roles
router.get("/role", protect, ReadRole);

//Initial
router.get("/initiale", protect, ReadInitiale);
//Tech Non tech
//Analyse
router.get("/analyseRole/:id", protect, RoleAttente);

//DATA TO TRACK
router.get("/read_data_to_track", ReadData);

router.get("/corbeille", protect, ReadCorbeille);

//Historique

module.exports = router;
