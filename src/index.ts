import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const links = [
  {
    id: "hacker-news-1",
    description: "hacker news topic 1",
    url: "www.example.com/hacker/news/1",
  }
];

// define GraphQL schema
const typeDefs = `#graphql
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String! url: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "GraphQL Sample Book",
    feed: () => links,
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server)
  .then(({url}) => console.log(`Starting ${url}...`));
