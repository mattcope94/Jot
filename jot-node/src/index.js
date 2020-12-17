const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
  Query: {
    info: () => `This is the jot API`,
    feed: () => links,
},

Mutation: {
  // 2
  post: (parent, args) => {
     const link = {
      id: `link-${idCount++}`,
      description: args.description,
      url: args.url,
    }
    links.push(link)
    return link
  }
    
  }
}

const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Listening on ${url}`)
  );