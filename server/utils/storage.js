const cloudinary = require('cloudinary');

const storage = ({ stream }) => {

	cloudinary.config({
		cloud_name:'dri3fx47v',
		api_key:'448547685838213',
		api_secret:'ByqQ7RinhXngU4bAqr8ZuwEzWVY'
	});

	return new Promise((resolve,reject) => {
		const buffer = cloudinary.v2.uploader.upload_stream((err,result) => {
			if(err) reject(err);
			resolve(result);
		});//chunks

		stream.pipe(buffer);

	});

};

module.exports = storage;