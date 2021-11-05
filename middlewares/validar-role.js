const { request, response } = require("express");

const isAdminRole=(req=request, res=response, next)=>{
    const usuario=req.autenticado;

    if(!usuario){
        return res.status(500).json({
            msg:"se quiere verificar el rol sin validar el token primero"
        });
    }

    if(usuario.rol!=="ADMIN_ROLE"){
        return res.status(403).json({
            msg:"you don't have permision for this action"
        });
    }

    next();
}

const tieneRoles=( ...roles )=>{
    return (req, res, next)=>{
        const usuario=req.autenticado;
        if(!usuario){
            return res.status(500).json({
                msg:"se quiere verificar el rol sin validar el token primero"
            });
        }

        if(!roles.includes(usuario.rol)){
            return res.status(403).json({
                msg:"you don't have permision"
            });
        }


        next();
    }
    
}

module.exports={
    isAdminRole,
    tieneRoles
}