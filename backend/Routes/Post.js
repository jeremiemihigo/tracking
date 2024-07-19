const express = require("express");
const { LoginAgentAdmin, UpdatePassword } = require("../Controller/Login");
const router = express.Router();

const { protect } = require("../MiddleWare/protect");
const { AddProcess, ReadProcess } = require("../Controller/Process");

const { AddStatus, ReadStatus } = require("../Controller/Status");

const { AddAdminAgent, ReadAgent } = require("../Controller/AgentAdmin");
const { AddRole, ReadRole } = require("../Controller/Role");
const { Clients, PostStatus, ChangeByFile } = require("../Controller/Client");
const { Historique } = require("../Controller/History");
const { Initiale, ReadInitiale } = require("../Controller/Initiale");
const {
  RemotedBy,
  CustomerDeedline,
  AnalyseClient,
  AttenteStatut,
} = require("../Controller/Analyse");
const { Rapport } = require("../Controller/Rapport");
const { pushClientVisite } = require("../Controller/VisiteMenage");
const { AddAction } = require("../Controller/Action");
const { CreateLink } = require("../Controller/Departement_fonc");

//AgentAdmin
router.post("/agent", protect, AddAdminAgent, ReadAgent);
//Login
router.post("/login", LoginAgentAdmin);
router.post("/resetpassword", UpdatePassword);

//Main process

//Process
router.post("/process", protect, AddProcess, ReadProcess);
//Status
router.post("/status", protect, AddStatus, ReadStatus);

//Actions
router.post("/action", protect, AddAction);

//Roles
router.post("/role", protect, AddRole, ReadRole);

//Clients
router.post("/client", protect, Clients);
router.post("/feedbackvm", pushClientVisite);
router.post("/postclient", protect, PostStatus);
//History
router.post("/history", protect, Historique);
//Initial
router.post("/initiale", Initiale, ReadInitiale);
//Analyse
router.post("/remotedBy", RemotedBy);
router.post("/deedline", protect, CustomerDeedline);
router.post("/analyseClient", AnalyseClient);
router.post("/attenteStatut", AttenteStatut);

router.post("/changestatusFile", protect, ChangeByFile);

//DATA TO TRACK

router.post("/link", CreateLink);

//Rapport
router.post("/rapport", Rapport);

module.exports = router;
