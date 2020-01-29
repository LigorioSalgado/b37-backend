const bcrypt =  require('bcrypt');
const { getUserByEmail  } =  require('../services/UserService');
const createToken = require('./createToken');

module.exports = ({email, password}) => {

	return new Promise((resolve,reject) => {
		getUserByEmail(email).then((user) => {
			if(!user) reject(new Error('User not found'));
			bcrypt.compare(password,user.password,(err,isValid) => {
				isValid ? resolve(createToken(user)) : reject(new Error('Password not match'));
			});
            
		});
	});

};