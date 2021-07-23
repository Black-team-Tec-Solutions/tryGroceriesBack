const mongoose = require("mongoose");
const { Schema , model } = mongoose;


const userSchema = new Schema({

    name:{
        type:String,
        required:[true,"Debes agregar un nombre"],
        minlength:1,
    },
    email:{
        type:String,
        unique:[true,"Ya existe este correo electronico"],
        required:[true,"Debes agregar un correo electronico"],
    },
    password:{
        type:String,
        required:[true,"Debes agregar una cotraseña"],
    },
    stage:{
        type:Number,
        default:0
    }

},{timestamps:true})

module.exports = model("User",userSchema)