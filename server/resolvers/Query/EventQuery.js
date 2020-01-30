const EventServices = require('../../services/EventService');


const allEvents = (root,args,context) => {
	return EventServices.getEvents();
};

const getEvent = (root,args,context) => {
	return EventServices.getEventByID(args.id);
};


module.exports = {
	allEvents,
	getEvent
};