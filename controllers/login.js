const { response } =require("express");
const bcryptjs=require("bcryptjs");

const Usuario=require("../Models/usuario");
const {generarJWT}=require("../helpers/generar-jwt");


const login=async (req, res=response)=>{

    const {correo,password}=req.body;

    const usuario=await Usuario.findOne({correo,estado:true});


    if(!usuario){

        return res.status(400).json({
            msg:"El correo no se encuentra registrado en la BD"
        })
    }
     const validPassword=bcryptjs.compareSync(password,usuario.password);

     if(!validPassword){
         return res.status(400).json({
             msg:"usuario o contraeña incorrecta"
            });
     }

     const token=await generarJWT(usuario._id);

    res.json({
       usuario,
        token
    });

}

module.exports={ login }