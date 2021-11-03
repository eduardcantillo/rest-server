const  validarCampos = require("../middlewares/validar-campos");
const  validarJWT  = require("../middlewares/validar-jwt");
const  tieneRoles  =require("../middlewares/validar-role");


module.exports={
    ...validarCampos,
    ...validarJWT,
    ...tieneRoles
}