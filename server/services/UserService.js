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
	return User.create(data).exec();

};

const updateUserByID = (id, data) =>{
	return User.findOneAndUpdate({_id:id},{'$set' :{ ...data }});
};

const updateUserByEmail = (email, data) =>{
	return User.findOneAndUpdate({email},{'$set' :{ ...data }});
};

const deleteUserByID = (id) =>{
	return User.findOneAndUpdate({_id:id},{'$set' :{ is_active:false }});
};

module.exports = {
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

