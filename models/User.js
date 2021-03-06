const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 12, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({ email })
		.exec(function( err, user) {
			if (err) return callback(err);

			if (!user) {
				const err = new Error('User Not Found!');
				err.status = 401;
				return callback(err);
			}

			bcrypt.compare(password, user.password, function(err, res) {
				console.log(password);
				console.log(user.password);
				if (res === true) return callback(null, user);

				return callback();
			})
		});
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
