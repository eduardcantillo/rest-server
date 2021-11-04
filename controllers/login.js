const { response, request } =require("express");
const bcryptjs=require("bcryptjs");

const Usuario=require("../Models/usuario");

const {generarJWT}=require("../helpers/generar-jwt");
const { verify }=require("../helpers/google-verify");


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

const googleSignIn=async(req=request, res=response)=>{
    const {id_token}=req.body;
   
   try {

    const {correo, nombre, img}=await verify(id_token);
    let usuario= await Usuario.findOne({correo});

    if(!usuario){
        const data={
            nombre,
            correo,
            password:":p",
            img,
            google:true,
            estado:true,
            rol:"USER_ROLE"
        }

        usuario = new Usuario(data);
        await usuario.save();
        
    }

    if(!usuario.estado){
        return res.status(401).json({
            msg:"pongase en contacto con el administrador"
        });
    }

    const token=await generarJWT(usuario._id);
    
    
    res.status(200).json({
        msg:"todo bien",
        id_token:token,
        usuario
    });


   } catch (error) {
    
    console.log(error);
    res.status(400).json({
        msg:"invalid token",

    })
       
   } 
   
}

module.exports={ login,googleSignIn }