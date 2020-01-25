const { createUser } =  require('../../services/UserService');

const newUser = (root,args,context,info) => {
    
	return createUser(args);

};



module.exports = {
	newUser
};