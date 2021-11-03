const { response, request } = require("express");
const jwt=require("jsonwebtoken");
const Usuario = require("../Models/usuario");


const validarJWT=async (req=request,res=response,next)=>{

    const token=req.header("x-token");
    if(!token){
        res.status(401).json({
            msg:"need a token in the request incomming"
        });
    }

    try{

        const {uid} = jwt.verify(token,process.env.SECRET_KEY);
        const usuario=await Usuario.findOne({_id:uid, estado:true});

        if(!usuario){
            return res.status(401).json({
                msg:"invalid token"
            });
        }


        req.autenticado=usuario;

        next();

    }catch(error){

        console.log(error);
        res.status(401).json({
            msg:"ivalid token"
        });


    }
    

}

module.exports={
    validarJWT
}