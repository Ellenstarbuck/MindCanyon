const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true 
})


userSchema.methods.validatePassword = function validatePassword(password) { 
  return bcrypt.compareSync(password, this.password) 
}

userSchema
  .pre('save', function hashPassword(next) { 
    if (this.isModified('password')) { 
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)) 
    }
    next() 
  })

module.exports = mongoose.model('User', userSchema)