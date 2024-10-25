const { gql } = require('apollo-server');

const typeDefs = gql`
  type ImageRecognitionResult {
    name: String
    unit: String
    quantity: Float
  }

  # Add a basic Query type
  type Query {
    _empty: String
  }

  type Mutation {
    recognizeImage(image: String!): ImageRecognitionResult
  }
`;

module.exports = typeDefs;
