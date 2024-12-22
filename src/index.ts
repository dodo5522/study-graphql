import {ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

interface Link {
  id: string;
  description: string;
  url: string;
}

const links: Link[] = [
  {
    id: "news-1",
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

  type Mutation {
    post(url: String!, description: String!): Link!
  }
`;

const resolvers = {
  Query: {
    info: () => "GraphQL Sample Book",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const nextId = `news-${links.length + 1}`;
      const newLink: Link = {
        id: nextId,
        description: args.description,
        url: args.url,
      };
      links.push(newLink);
      return newLink;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server)
  .then(({url}) => console.log(`Starting ${url}...`));
