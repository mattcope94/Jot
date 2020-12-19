const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('apollo-server');
const Subscription = require('./resolvers/Subscription')


const resolvers = {
  Query: {
    info: () => `This is the jot API`,
    feed: async (parent, args, context) => {
        return context.prisma.note.findMany()
      },
      // Get note by id
      get: (args, context) => {
        const Note = context.prisma.note.findUnique({
            where:{
                  id:args.id
            }
        })
        return Note
    }
    },
    Mutation: {
      post: (parent, args, context, info) => {
        const newNote = context.prisma.note.create({
          data: {
            body: args.body,
            tag: args.tag,
          },
        })
        return newNote
      },
      
    }
}

const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
    pubsub,
    Subscription
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Listening on ${url}`)
  );