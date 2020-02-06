const jwt = require('jsonwebtoken');

const SECRET = 'kjsahdkjhsajkdhjkashfjksdhfjkhsdkjf';

module.exports = (user) => {

	const payload = {
		id:user._id,
		email:user.email,
		first_name:user.first_name
	};
    
	return jwt.sign(payload, SECRET,{expiresIn:'1d'});

};