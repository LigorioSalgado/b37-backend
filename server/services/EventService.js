const Event = require('../models/Events');

const createEvent = (event) => {
	return Event.create(event);
};

const getEvents = () => {
	return Event.find({is_active:true}).populate('created_by').exec();
};

const getEventByID = (_id) => {
	return Event.findOne({_id}).populate('created_by').exec();
};

const updateEvent = (_id,data) => {
	return Event.findOneAndUpdate({_id},{$set:{...data}},{new:true}).exec();
};

const deleteEvent = (_id) => {
	return Event.findOneAndUpdate({_id},{$set:{is_active:false}},{new:true}).exec();
};

const addUserToEvent = (_id, user ) => {
	return Event.findOneAndUpdate({_id},{$push:{assistants:user}});
};

const removeUserFromEvent = async(_id, user) => {
	const event  = await Event.findOne({_id});
	event.assistants = event.assistants.filter( assistant => assistant !== user);
	await event.save();
	return event;
};

module.exports = {
	createEvent,
	getEvents,
	getEventByID,
	updateEvent,
	deleteEvent,
	addUserToEvent,
	removeUserFromEvent
};