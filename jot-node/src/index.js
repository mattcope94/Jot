const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
  Query: {
    info: () => `This is the jot API`,
    feed: async (parent, args, context) => {
        return context.prisma.note.findMany()
},

Mutation: {
 
  post: (parent, args, context) => {
    const newNote = context.prisma.note.create({
        data: {
          body: args.body,
          tag: args.tag,
        },
      })
      return newNote
    } 
  }},
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