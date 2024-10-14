const { default: mongoose } = require("mongoose");
const mongose=require("mongoose");

const planetsSchema=new mongose.Schema({
    keplerName: {
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Planet',planetsSchema);