const {Router}=require("express");
const {check}=require("express-validator");
const { login, googleSignIn }=require("../controllers/login");
const { validarCampos } = require("../middlewares/validar-campos");



const route=Router();

route.post("/login",[
    check("correo","debe ser un corrreo valido").isEmail(),
    check("password","debe enviar una contraseña").notEmpty(),
    validarCampos
],login);

route.post("/google",[
    check("id_token","token de google es necesario").notEmpty(),
    validarCampos
],googleSignIn);


module.exports=route;