const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hecho!!");
});

//Login

router.get("/signup", (req, res, next) => {});

router.post("/signup", (req, res, next) => {
  res.send(req.body);
});

router.get("/signin", (req, res, next) => {});

router.post("/signin", (req, res, next) => {});

router.get("crud-cream/task", function(req, res) {});

router.get("crud-cream/task/:_id", function(req, res) {});

//Grud

router.post("/GrudCream/Grud", function(req, res) {
  console.log("POST /crud-name/tasks");
  console.log(req.body);
  let GrudCream = new GrudCream();
  GrudCream.author = req.body.author;
  GrudCream.description = req.body.description;
  GrudCream.status = req.body.status;

  GrudCream.save((err, taskStored) => {
    if (err)
      res
        .status(500)
        .send({ message: `Error al salvar en la base de datos: ${err}` });

    res.status(200).send({ GrudCream: taskStored });
  });
});

//Instruccion update lista, actualiza por ID
router.put("/GrudCream/Grud/:_id", function(req, res) {
  console.log("UPDATE");
  let GrudCream_id = req.params._id;
  let update = req.body;
  GrudCream.findByIdAndUpdate(GrudCream_id, update, (err, taskUpdated) => {
    if (err)
      res.status(500).send({ message: `Error al actualizar la orden: ${err}` });

    res
      .status(200)
      .send(
        { tasGrudCreamk: taskUpdated },
        { message: `La orden ha sido actualizada` }
      );
  });
});

//Instruccion delete lista, elimina por ID
router.delete("/GrudCream/Grud/:_id", async (req, res) => {
  console.log("DELETE");
  let GrudCream_id = req.params._id;
  GrudCream.findById(GrudCream_id, (err, task) => {
    if (err)
      res.status(500).send({ message: `Error al borrar la orden: ${err}` });

    GrudCream.remove(err => {
      if (err)
        res
          .status(500)
          .send({ message: `Error a borrar al borrar la orden: ${err}` });
      res.status(200).send({ message: `La orden ha sido eliminada` });
    });
  });
});

module.exports = router;
