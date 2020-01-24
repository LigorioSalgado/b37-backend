const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema  = new Schema({
	title :{
		type:String,
		required:true
	},
	description :{
		type:String,
		required:true,
	},
	date :Date,
	address:{
		street:String,
		city:String,
		number: String,
		country:String,
		state:String,
		zip:String
	},
	assistants:{
		type:[Schema.Types.ObjectId],
		ref:'users'
	},
	created_by:{
		type:Schema.Types.ObjectId,
		ref:'users'
	},
	banner:{
		type: String
	},
	tags:{
		type:[String]
	},
	is_active:{
		type: Boolean,
		default: true
	}

},{timestamps:true} );

module.exports = mongoose.model('events',EventSchema);