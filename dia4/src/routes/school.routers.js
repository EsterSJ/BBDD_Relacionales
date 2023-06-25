const { Router } = require ("express");
const router = Router();
const schoolCtrl = require ("../controller/school.controller");

//RETO 1
router.get("/alumnos", schoolCtrl.getAlumnos);
router.post("/alumnos", schoolCtrl.postAlumnos);
router.put("/alumnos", schoolCtrl.putAlumnos);
router.delete("/alumnos", schoolCtrl.deleteAlumnos);

//RETO 2
router.get("/media", schoolCtrl.getMedia);
router.get("/apuntadas", schoolCtrl.getApuntadas);
router.get("/impartidas", schoolCtrl.getImpartidas);

module.exports = router;