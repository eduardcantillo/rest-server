const { response, request } = require("express");
const { Producto } = require("../Models");


const crearProducto=async(req, res=response)=>{

    const data=req.body;

    let producto=await Producto.findOne({nombre:data.nombre});

    if(producto){
        return res.status(400).json({
            msg:"Ya existe un producto con el mismo nombre"
        });
    }

    

    producto=new Producto(data);
    producto.usuario=req.autenticado._id;

    console.log(producto);

    await producto.save();

    return res.status(200).json({
        producto
    });


}


const obtenerTodos=async (req=request, res=response)=>{
    const {limit=5, desde=0} =req.query;

    const [productos,total]=await Promise.all([
        Producto.find({estado:true})
        .populate("usuario","nombre")
        .populate("categoria","nombre")
        .skip(Number(desde)).limit(Number(limit)),
        
        Producto.countDocuments({estado:true})
    ]); 

    return res.status(200).json({
        total,
        productos
    });
}


const obtenerPorId=async (req, res)=>{
    const {id} =req.params;

    const producto= await Producto.findById(id)
                            .populate("usuario","nombre")
                            .populate("categoria","nombre");


    return res.status(200).json({
        producto
    }); 
}

const eliminarProducto=async (req, res)=>{
    const {id} =req.params;

    const producto= await Producto.findByIdAndUpdate(id,{estado:false},{new:true});


    return res.status(200).json({
        producto
    }); 
}
module.exports={
    crearProducto,
    obtenerTodos,
    obtenerPorId,
    eliminarProducto
}