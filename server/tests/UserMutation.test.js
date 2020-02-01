jest.mock('../services/UserService.js', () => jest.requireActual('../services/__mocks__/UserService.js'));
const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');
const  { schema } = require('../index');
//const { importSchema } = require('graphql-import');
//7const resolvers =  require('../resolvers');
//const typeDefs = importSchema('../schema.graphql');

const CREATE_USER = gql`
mutation createUser($Userdata:UserAdd!){
  newUser(data:$Userdata){
    _id
    first_name
    last_name
  }
}

`;

const GET_USERS = gql`
query getUsers{
  allUsers{
    _id
    email
    first_name
    last_name
    
  }
}

`;

test('Create User', async() => {
	const server = new ApolloServer({
		schema
	});
	const { mutate } = createTestClient(server);

	const res =  await mutate({
		mutation: CREATE_USER,
		variables: { Userdata:{
			email:'prueba@prueba.com',
			first_name:'prueba',
			last_name: 'prueba',
			password:'prueba'
		}}
	});

	expect(res).toMatchSnapshot();
	expect(res.data.newUser).toHaveProperty('_id');
});


test('Not Create User', async() => {
	const server = new ApolloServer({
		schema
	});
	const { mutate } = createTestClient(server);

	const res =  await mutate({
		mutation: CREATE_USER,
		variables: { Userdata:{
			last_name: 'prueba',
			password:'prueba'
		}}
	});

	expect(res).toHaveProperty('errors');
});

test('Create User', async() => {
	const server = new ApolloServer({
		schema
	});
	const { mutate } = createTestClient(server);

	const res =  await mutate({
		mutation: CREATE_USER,
		variables: { Userdata:{
			email:'prueba@prueba.com',
			first_name:'prueba',
			last_name: 'prueba',
			password:'prueba'
		}}
	});

	expect(res).toMatchSnapshot();
	expect(res.data.newUser).toHaveProperty('_id');
});

test('Get Users', async() => {
	const server = new ApolloServer({
		schema
	});
	const { query } = createTestClient(server);

	const res =  await query({
		mutation: GET_USERS,});

	expect(res).toMatchSnapshot();
});

