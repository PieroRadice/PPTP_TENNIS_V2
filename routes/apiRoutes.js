const { Router } = require("express");
const router = Router();

const { Tournament } = require("../models/Tournament");

router.get("/tornei", async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Errore nel recupero dei tornei:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});

router.get("/tornei/:ID", async (req, res) => {
  //console.log("GET /api/tornei/:ID");
  try {
    const tournament = await Tournament.findOne({
      where: { ID: req.params.ID },
    });
    res.status(200).json(tournament);
  } catch (error) {
    console.error("Errore nel recupero del torneo:", error);
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});

module.exports = router;
