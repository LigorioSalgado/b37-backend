const User = require('../models/Users');

const getUsers = (args) => {
	return User.find(args).exec();
};

const getUserByEmail =  (email) => {
	return User.findOne({email}).exec();
};

const getUserByID =  (_id) => {
	return User.findOne({_id}).exec();
};
const createUser = (data) => {
	return User.create(data);
};

const updateUserByID = (id, data) =>{
	return User.findOneAndUpdate({_id:id},{$set :{ ...data }});
};

const updateUserByEmail = (email, data) =>{
	return User.findOneAndUpdate({email},{$set :{ ...data }});
};

const deleteUserByID = (id) =>{
	return User.findOneAndUpdate({_id:id},{ $set :{ is_active:false }});
};

const addEventToUser = (_id, event) => {
	return User.findOneAndUpdate({_id}, {$push:{events_assist:event}});
};

const removeEventFromUser = async(_id,event) => {
	const user = User.findOne({_id});
	if(user.events_assist.indexOf(event) !== -1){
		const index  = user.events_assist.indexOf(event);
		user.events_assist.splice(index,1);
		await user.save();
	}
	return user;
};

const addCreatedEvent = (_id, event) => {
	return User.findOneAndUpdate({_id}, {$push:{events_create:event}});
};

module.exports = {
	addEventToUser,
	removeEventFromUser,
	addCreatedEvent,
	getUsers,
	getUserByEmail,
	getUserByID,
	createUser,
	updateUserByEmail,
	updateUserByID,
	deleteUserByID
} ;

// module.exports = {

//     getUsers: () => {

//     },
//     getUserByEmail: () => {

//     }

// }

