const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3
	},
	email: {
		type: String,
		required: true,
		minlength: 5
	},
	password: {
		type: String,
		required: true,
		minlength: 5
	},
	blogs: [{
		type: Schema.Types.ObjectId,
		ref: 'Blog'
	}],
	likedBlogs: [{
		type: Schema.Types.ObjectId,
		ref: 'Blog'
	}],
	savedBlogs: [{
		type: Schema.Types.ObjectId,
		ref: 'Blog'
	}],
	profileViews: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	followedUsers: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

userSchema.pre('save', function (next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			return next();
		});
	});
});

userSchema.methods.comparePassword = function (password, callback) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};

userSchema.set('toJSON', {
	transform: (document, returned) => {
		returned.id = document._id.toString();
		delete returned._id;
		delete returned.__v;
		delete returned.password;
	}
});

module.exports = mongoose.model('User', userSchema);