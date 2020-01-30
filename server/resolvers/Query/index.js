const UserQuery = require('./UserQuery');
const EventQuery =  require('./EventQuery');

module.exports = {
	...UserQuery,
	...EventQuery
};
