const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const resolvers = {
	Query: {
		prueba: () => 'Hola Mundo!!!'
	}
};

const typeDefs = importSchema(__dirname + '/schema.graphql');

// const schema = {
//     resolvers,
//     typeDefs
// }

const MONGO_URI =
  'mongodb+srv://prueba3:prueba3@cluster0-vp6hz.mongodb.net/meetup?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const mongo = mongoose.connection;

mongo
	.on('error', error => console.log(error))
	.once('open', () => console.log('Connected to database'));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Server starts in : ${url}`);
});
