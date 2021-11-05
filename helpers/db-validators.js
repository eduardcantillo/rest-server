const {Usuario,Role, Categoria, Producto}=require("../Models");

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

const existeCategoria=async (id="")=>{
    const categoria=await Categoria.findById(id);

    if(!categoria){
        throw new Error(`No existe ninguna categoria asociada al id: ${id}`);
    }
}

const existeProducto= async(id="")=>{
    const producto=await Producto.findById(id);
    if(!producto){
        throw new Error("No existe un producto con ese ID");
    }
}
module.exports={
isValidRole,
existEmail,
existUsuario, 
existeCategoria,
existeProducto
}