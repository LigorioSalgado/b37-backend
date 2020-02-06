const { createUser, updateUserByID, getUserByID, deleteUserByID } =  require('../../services/UserService');
const storage = require('../../utils/storage');
const authenticate = require('../../utils/authenticate');

const newUser = async(root,{data},context,info) => {
	if(data.photo){
		const { createReadStream }  = await data.photo;
		const stream = createReadStream();
		const image = await storage({ stream });
		data = {...data,photo:image.url};
	}
	return createUser(data);

};

const login = async(root,args) => {
	const token = await authenticate(args);
	return {
		token,
		message: 'Token created Successfully'
	};
};

const updateUser = async(_,{data,id}) => {
	if(data.photo){
		const { createReadStream }  = await data.photo;
		const stream = createReadStream();
		const image = await storage({ stream });
		data = {...data,photo:image.url};
	}
	await updateUserByID(id, data);
	return getUserByID(id);
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
	login
};