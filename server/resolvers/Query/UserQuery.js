
const { getUsers, getUserByEmail, getUserByID } = require('../../services/UserService');


const allUsers = (root,args,context,info) => {
	console.log(args);
	return getUsers(args);
};

const getOneUser = (root,args,context,info)  => {
	if(args.email){
		return getUserByEmail(args.email);
	}else if (args.id){
		return getUserByID(args.id);
	}else {
		throw Error('You need to choose email or id');
	}

};

module.exports = {
	allUsers,
	getOneUser
};