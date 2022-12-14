//User Model to signup/login
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^((\S[^@])*|\w+)(\w+|\-|\-\w+)*@((\w+(\-*\w){1})|\w+)+\.\w{2,}?$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
      allowNull: false
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]  
  },
  {
    toJSON: {
        virtuals: true
    }
  }
);


UserSchema.virtual('itemCount').get(function() {
  return this.cartItems.length
})

// set up pre-save middleware to create password
UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};



const User = model('User', UserSchema);

// export the User model
module.exports = User;