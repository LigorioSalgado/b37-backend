const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } =  require('graphql-tools');
const resolvers =  require('./resolvers');
const verifyToken = require('./utils/verifyToken');
const AuthDirective = require('./resolvers/Directives/AuthDirective');

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

const schema =  makeExecutableSchema({
	typeDefs, 
	resolvers,
	schemaDirectives:{
		auth:AuthDirective
	}
});

const server = new ApolloServer({ 
	schema,
	context: ({req}) =>  verifyToken(req)
});

server.listen().then(({ url }) => {
	console.log(`Server starts in : ${url}`);
});
