const { response, request }=require("express");
const Usuario=require('../Models/usuario');
const bcrypt=require("bcryptjs");




const usuariosGet=async(req = request, res = response) => {

    const {limite=5, desde=0}=req.query;
    const query={estado:true}


   const [total,usuarios]= await Promise.all([
    Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number( limite ))
        .skip(Number( desde ))
    ]);

    return res.status(200).json({
        total,
        usuarios
    })
}


const usuariosPost=async (req,res = response)=>{

      

        const {nombre, correo, password, rol}=req.body;
        const usuario=new Usuario({nombre, correo, password, rol});
        const salt=bcrypt.genSaltSync();

        usuario.password=bcrypt.hashSync(password, salt);

        await usuario.save();

       return  res.status(201).json({
            mensaje:"Post API- controlador",
            usuario
        })
    

}

const usuariosDelete=async (req, res = response) => {

    const {id}=req.params;
    //const usuario=await Usuario.findByIdAndRemove(id);
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({
        usuario,
        autenticado:req.autenticado
        
    })
}

const usuariosPut= async (req, res = response) => {
    const id=req.params.id;
    const {_id, password, google, correo, ...resto}=req.body;

    if(password){
        const salt=bcrypt.genSaltSync();
        resto.password=bcrypt.hashSync(password,salt);}
    
    let usuario=await Usuario.findByIdAndUpdate(id,resto,{ new: true, runValidators: true });

    console.log(usuario);
    return res.status(200).json({
        mensaje:"Put Api - Controlador",
        usuario
    })
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}