const { Router } = require("express");
const { check } = require("express-validator");

const { crearCategoria, buscarCategoriaPorId, obtenerCategorias, eliminarCategoria,actualizarCategoria } = require("../controllers/categotias");
const { existeCategoria } = require("../helpers/db-validators");
const { validarJWT, validarCampos, isAdminRole } = require("../middlewares");

const router = Router();

router.get("/", obtenerCategorias);

router.get("/:id", [
    check("id", "no es un id mongo valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos
], buscarCategoriaPorId);

router.post("/", [validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos],
    crearCategoria);



router.put("/:id", [validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("id", "no es un id mongo valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos],
    actualizarCategoria);

router.delete("/:id", [
    validarJWT,
    isAdminRole,
    check("id","no es un id valido de mongo").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos

],eliminarCategoria);





module.exports = router;