"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const axios_1 = __importDefault(require("axios"));
const typeDefs = (0, apollo_server_express_1.gql) `
  type Image {
    url: String!
  }

  type Query {
    getImage(
      width: Int!
      height: Int!
      youngKeanu: Boolean
      grayscale: Boolean
    ): Image
  }
`;
const resolvers = {
    Query: {
        getImage: async (_, { width, height, youngKeanu, grayscale, }) => {
            try {
                const response = await axios_1.default.get(`https://placekeanu.com/${width}/${height}${youngKeanu || grayscale ? "/" : ""}${youngKeanu ? "y" : ""}${grayscale ? "g" : ""}`);
                return { url: response.request.res.responseUrl };
            }
            catch (error) {
                throw new Error("Error fetching image from placekeanu.com");
            }
        },
    },
};
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
