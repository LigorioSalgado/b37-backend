const UserMutation = require('./UserMutation');
const EventMutation = require('./EventMutation');

module.exports = {
	...UserMutation,
	...EventMutation
};