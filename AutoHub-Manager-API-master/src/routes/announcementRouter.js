const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");


router.get("/announcement", announcementController.getAllAnnouncement);
router.get("/announcement/:id", announcementController.getAnnouncementById);
router.post("/announcement/", announcementController.createAnnouncement);
router.put("/announcement/:id", announcementController.updateAnnouncement);
router.delete("/announcement/:id",  announcementController.deleteAnnouncement);
router.get("/countTitles", announcementController.countAnnouncement);

module.exports = router;
