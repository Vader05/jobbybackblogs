const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required:false
    },
    img : {
        type: String,
        required :false
    },
    createAt :{
        type: Date,
        default: Date.now()
    },
    updateAt:{
        type: Date,
        default: Date.now(),
        required: false
    }
});

const UserSchema = new Schema ({
    username: {
        type: String,
        required : true
    },
    univName :{
        type:String,
        default: "UNMSM"
    },
    password :{
        type: String,
        required: true
    },
    location : {
        type :String,
        default: "Lima"
    },
    article : [articleSchema]
    
})

var user = mongoose.model('User', UserSchema);
module.exports=user;