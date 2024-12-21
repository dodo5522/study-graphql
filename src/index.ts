import {ApolloServer, gql} from 'apollo-server';

// define GraphQL schema
const typeDefs = gql`
    type Book {
        title: String!
        author: String!
    }
`;


