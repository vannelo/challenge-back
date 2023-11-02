import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import axios from "axios";

const typeDefs = gql`
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
    getImage: async (
      _: any,
      {
        width,
        height,
        youngKeanu,
        grayscale,
      }: {
        width: number;
        height: number;
        youngKeanu: boolean;
        grayscale: boolean;
      }
    ) => {
      try {
        const response = await axios.get(
          `https://placekeanu.com/${width}/${height}${
            youngKeanu || grayscale ? "/" : ""
          }${youngKeanu ? "y" : ""}${grayscale ? "g" : ""}`
        );
        return { url: response.request.res.responseUrl };
      } catch (error) {
        throw new Error("Error fetching image from placekeanu.com");
      }
    },
  },
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
