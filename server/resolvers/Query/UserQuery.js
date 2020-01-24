const Users = require('../../models/Users');


const allUsers = (root,args,context,info) => {

	return Users.find().exec();
};

module.exports = {
    allUsers
}