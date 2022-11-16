const mongoose = require('mongoose');
 
const usernameSchema = new mongoose.Schema({
        Name:{type: String},
        Age:{ type : Number}, 
        Birth:{ type : Date},
        Profile_img:{
                        data: Buffer,
                        contentType: "String"
                },        
        Email:{ type : String},
        Password:{ type : String}

})
 
module.exports = mongoose.model('UserItem',usernameSchema);