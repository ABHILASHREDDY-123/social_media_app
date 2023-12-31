const mongoose = require("mongoose");
const {v1:uuidv1} = require("uuid");
const crypto  = require("crypto");
const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({

      name:{
        type:String,
        trim:true,
        required:true
      },
      email:{
        type:String,
        trim:true,
        required:true
      },
      
      hashed_password:{
        type:String,
        trim:true,
        required:true
      },
      salt:String,
      created :{
        type:Date,
        default: Date.now
      },
      updated: Date,
      photo:{
        data:Buffer,
        contentType:String
      },
      about:{
        type:String,
        trim:true
      },
      following:[
        {type:ObjectId,ref:"User"}
      ],
      followers:[
        {type:ObjectId,ref:"User"}
      ],
      resetPasswordLink : {
        data:String,
        default:""
      }

});

userSchema.virtual('password')
.set(function(password){
     this._password = password;
     this.salt = uuidv1();
    
     this.hashed_password = this.encryptPassword(password);

})
.get(function(){
    return this._password;
});

userSchema.methods = {
    authenticate : function(pass){
      return this.encryptPassword(pass) === this.hashed_password;
    },
    encryptPassword : function(password){
        if(!password){return "";}
        try{
                return crypto.createHmac("Sha1",this.salt).update(password).digest("Hex")
        }
        catch(err){
             return "";
        }
    }

};

module.exports = mongoose.model("User",userSchema);