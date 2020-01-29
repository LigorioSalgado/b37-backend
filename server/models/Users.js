const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema  = new Schema({
	first_name :{
		type:String,
		required:true
	},
	last_name :{
		type:String,
		required:true
	},
	email :{
		type:String,
		required: true,
		unique: true
	},
	password :{
		type:String
	},
	birth_date :{
		type: Date
	},
	gender: {
		type:String,
		enum:['M','F','O']
	},
	events_create: {
		type:[Schema.Types.ObjectId],
		ref: 'events'
	},
	events_assist: {
		type:[Schema.Types.ObjectId],
		ref: 'events'
	},
	photo:{
		type: String
	},
	is_active:{
		type: Boolean,
		default: true
	}

},{timestamps:true} );

UserSchema.pre('save',function(next){
	const user = this;
	const SALT_FACTOR = 10;
	if(!user.isModified('password')) next();
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(error,hash){
			user.password = hash;
			next();
		});

	});
});

module.exports = mongoose.model('users',UserSchema);