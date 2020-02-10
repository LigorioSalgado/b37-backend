const EventServices = require('../../services/EventService');
const UserServices = require('../../services/UserService');
const storage = require('../../utils/storage');



const createEvent = async(root,args,context) => {
	if(args.data.banner){
		const { createReadStream }  = await args.data.banner;
		const stream = createReadStream();
		const image = await storage({ stream });
		args.data = {...args.data,banner:image.url};
	}
	args.data.created_by = context.user._id;
	const event = await EventServices.createEvent(args.data);
	await UserServices.addCreatedEvent(context.user._id, event._id);
	return event;
};


const updateEvent = async(root, args, context ) => {
	const event = await EventServices.getEventByID(args.id);
	if(context.user._id === event.created_by){
		const newEvent = await EventServices.updateEvent(args.id,args.data);
		return newEvent;
	}else{
		throw Error('You can not edit this event');
	}
};


const deleteEvent = async(root, args, context ) => {
	const event = await EventServices.getEventByID(args.id);
	if(context.user._id === event.created_by){
		await EventServices.deleteEvent(args.id);
		return {code:204,message:'Event deleted successfully'};
	}else{
		throw Error('You can not delete this event');
	}
};

const joinEvent = async(root,args,context) => {
	await EventServices.addUserToEvent(args.id,context.user._id);
	await UserServices.addEventToUser(context.user._id,args.id);
	return {code:200,message:'Joined Event successfully'};
};


const leaveEvent = async(root,args,context) => {
	await EventServices.removeUserFromEvent(args.id,context.user._id);
	await UserServices.removeEventFromUser(context.user._id,args.id);
	return {code:200,message:'Removed Event successfully'};

};

module.exports = {
	createEvent,
	updateEvent,
	deleteEvent,
	joinEvent,
	leaveEvent
};


