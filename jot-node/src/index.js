const { ApolloServer } = require('apollo-server');



let links = [{
    id: 'link-0',
    url: 'www.jot.com',
    description: 'Tasks Reimagined '
  }]

let idCount = links.length

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

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Listening on ${url}`)
  );