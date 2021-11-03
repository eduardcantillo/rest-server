const  { Router } =require("express");
const { check } = require("express-validator");

const  { usuariosGet, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPut }=require("../controllers/usuarios");


const {isValidRole, existEmail, existUsuario} =require("../helpers/db-validators");
const {validarCampos,validarJWT,tieneRoles}=require("../middlewares")

const router=Router();

router.get("/", usuariosGet);

router.post("/",[
                 check("correo", "El correo no es valido").isEmail(),
                 check("nombre","El nombre es obligatorio").notEmpty(),
                 check("password","El password debe tener minimo 6 carateres").isLength({min:6}),
                // check("rol","No es un rol permitido").isIn(["ADMIN_ROLE","USER_ROLE"]),
                check("rol").custom(/*(rol)=>isValidRole(rol)*/isValidRole),
                check("correo").custom(existEmail),
                validarCampos
                ],usuariosPost);

router.delete("/:id",[
                        validarJWT,
                        tieneRoles("ADMIN_ROLE","VENTAS_ROLE"),
                        check("id","no es un id valido").isMongoId(),
                        check("id").custom(existUsuario),
                        validarCampos
                        ], usuariosDelete);

router.put("/:id",[
                check("id","no es un id valido").isMongoId(),
                check("rol").custom(isValidRole),
                check('id').custom(existUsuario),
                validarCampos
                ], usuariosPut);        






module.exports=router;