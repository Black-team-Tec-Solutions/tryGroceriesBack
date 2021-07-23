const mongoose = require("mongoose");
const { Schema , model } = mongoose;


const DietSchema = new Schema({

    days:{
        type:Number,
        min:1
    },
    mealNum:{
        type:Number,
        min:1
    },
    meals:{
        type:[{}],
    },
    _owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports = model("Diet",DietSchema)