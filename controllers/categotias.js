const { request, response } = require("express");
const { Categoria } = require("../Models");

//Obtener todas las categorias paginadas y con el total de elemento y con el populate

// Actualizar Categoria

//Eliminar Categoria


const obtenerCategorias = async (req=request, res)=>{

    const {limit=5,desde=0}=req.query;

    console.log
    const[categorias,total]=await Promise.all([
            Categoria.find({estado:true}).populate("usuario","nombre").skip(Number(desde)).limit(Number(limit)),
            Categoria.countDocuments({estado:true}) ]);
    

    res.status(200).json({
            total,
            categorias
    });
}

const buscarCategoriaPorId=async (req=request, res=response)=>{
    const { id }=req.params;

    let categoria = await Categoria.findById(id)
            .populate("usuario","nombre");
           

    if (!categoria){
        return res.status(204).json({
            msg:`No se encontro la categoria con el id: ${id}`
        });
    }

    return res.status(200).json({
        categoria
    });

}

const crearCategoria=async (req=request,res=response)=>{

    const nombre=req.body.nombre.toUpperCase();

    const categoriaDB=await Categoria.findOne({nombre});
     
    if(categoriaDB){
        return res.status(400).json({
            msg:"Ya existe una categoria con ese nombre"
        });
    }

    const data={
        nombre,
        usuario:req.autenticado._id
    }

    const categoria= new Categoria(data);
    await categoria.save();

    res.status(201).json({
        msg:"todo OK",
        categoria
    })
}

const eliminarCategoria=async(req, res)=>{

    const { id } = req.params;
    const usuario=req.autenticado;

    const categoria=await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});

    return res.status(200).json({

        categoria,
        usuario

    });
}

const actualizarCategoria=async(req=request, res=response)=>{

    const nombre=req.body.nombre.toUpperCase();
    const { id }= req.params;

    const data={nombre,usuario:req.autenticado._id}

    let categoria=await Categoria.findOne({nombre});

    if(categoria){
        res.status(400).json({
            msg:`Ya existe una categoria con el nombre ${nombre}`
        });
    }

    categoria=await Categoria.findByIdAndUpdate(id,data,{new: true});

    return res.status(200).json({
        categoria
    });

}





module.exports={
    crearCategoria,
    buscarCategoriaPorId,
    obtenerCategorias,
    eliminarCategoria,
    actualizarCategoria
}