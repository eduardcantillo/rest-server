const {Schema,model}=require('mongoose');


const UsuarioSchema=Schema({

    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo debe ser obligatorio'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'La contaraseña debe ser obligatoria']
    },
    img:{
        type:String,
     },
    rol:{
         type:String,
         require:true,
         //enum:["ADMIN_ROLE","USER_ROLE"]
     },
     estado:{
         type:Boolean,
         default:true
     },
     google:{
         type:Boolean,
         default:false
     }


});

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id, ...usuario}=this.toObject();
    usuario.uid=_id;
    return usuario;
}

module.exports=model("Usuario",UsuarioSchema);

