const { createUser, updateUserByID, getUserByID, deleteUserByID } =  require('../../services/UserService');

const newUser = (root,args,context,info) => {
    
	return createUser(args.data);

};

const updateUser = async(_,args) => {
	await updateUserByID(args.id, args.data);
	return getUserByID(args.id);
};

const deleteUser = async(_, args) => {
	await deleteUserByID(args.id);
	return {
		code:204,
		message:'User removed successfully'
	};

};



module.exports = {
	newUser,
	updateUser,
	deleteUser,

};