require('dotenv').config();
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

const MONGO_URI = process.env.MONGO_URI;

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
	},
});

const server = new ApolloServer({ 
	schema,
	cors:{
		origin:process.env.WHITHELIST.split(',')
	},
	context: ({req}) =>  verifyToken(req)
});

const port = process.env.PORT || 4000;


server.listen({port}).then(({ url }) => {
	console.log(`Server starts in : ${url}`);
});
