const Role=require("../Models/role");
const Usuario=require("../Models/usuario");

const isValidRole=async ( rol="" ) =>{
                        
const exisRol=await Role.findOne({ rol });
    if(!exisRol){
            throw new Error(`El rol: ${rol} no esta registrado en la base de datos`);
    }
}

const existEmail=async(correo)=>{

    const existeEmail=await Usuario.findOne({correo});

        if(existeEmail){
           throw new Error(`El correo: ${correo} ya se encuentra registrado en la base de datos`);
        }
    }


const existUsuario=async(id="")=>{
    const usuario=await Usuario.findById(id);

    if(!usuario){
        throw new Error(`No existe nungun usuario con el id ${id}`);
    }
}
module.exports={
isValidRole,
existEmail,
existUsuario
}