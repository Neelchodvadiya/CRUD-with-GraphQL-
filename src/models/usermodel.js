const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
},
    {
        collection:"userdemo"
    
})
module.exports = mongoose.model("userdemo",userschema);