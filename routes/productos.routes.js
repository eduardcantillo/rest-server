const { Router } = require("express");
const { check } = require("express-validator");

const { crearProducto,obtenerTodos,obtenerPorId, eliminarProducto} = require("../controllers/productos");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarJWT, validarCampos, isAdminRole } = require("../middlewares");

const route=Router();

route.post("/",[
    validarJWT,
    check("nombre","debe existir el nombre").notEmpty(),
    check("categoria","no es un ID valido de mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos
],crearProducto);

route.get("/",obtenerTodos);

route.get("/:id",[
    check("id","no es un id valido de mongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos
],obtenerPorId);

route.delete("/:id",[
    validarJWT,
    isAdminRole,
    check("id","no es un id valido de mongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos
],eliminarProducto);



module.exports = route;