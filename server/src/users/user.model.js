
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        required:true,
    }
})

userSchema.pre('save', async function(next) {
  //checks if the password is modified
  //if not, it  will not hash the password
  // and move to the next operation
  if (!this.isModified("password")) return next();

  /*if the password is modified, it will hash the password
    and move to the next operation
    when bcrypting a password, it is recommended to use a salt( a random string that is added to the password)
    to make the password more secure*/
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
})

const User = mongoose.model("User", userSchema);
module.exports = User;