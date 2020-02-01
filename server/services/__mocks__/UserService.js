const Services = jest.genMockFromModule('../../services/UserService');
const keys = ['email', 'first_name', 'last_name', 'password'];


function createUser(data){
	const newUser = {'_id':'5e2bb4004809b000d6141c73','events_create':[],'events_assist':[],'is_active':true,'first_name':'Edwin','last_name':'Salgado','email':'edwin@devf.mx','gender':'M'};

	return new Promise((resolve) => {
		if (keys.every(e => Object.keys(data).includes(e))) {
			resolve(newUser);
		}else{
			throw new Error('Validadtion Error');
		}
	});

}

Services.createUser = createUser;

module.exports = Services;