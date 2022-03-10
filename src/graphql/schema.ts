import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  enum Genre {
    adventure
    drama
    scifi
  }

  enum Authors {
    AUTHORS
  }

  enum Libraries {
    LIBRARIES
  }

  type Query {
    authors(author: Authors): [Author]
    author(author: Authors, authorId: String): Author
    book(bookId: String): Book
    books(book: String): [Book]
    library(libraryId: String): Library
    libraries(library: Libraries): [Library]
  }

  type Mutation {
    createBook(input: CreateBook!): Book
    createAuthor(input: CreateAuthor!): Author
    createLibrary(input: CreateLibrary!): Library
  }

  type Author {
    PK: ID!
    SK: ID!
    name: String
    age: String
    book: [Book]
  }

  type Book {
    PK: ID!
    SK: ID!
    GSI1PK: ID!
    GSI1SK: ID!
    title: String
    price: String
    publishingYear: String
    publisher: String
    author: Author
    description: String
    page: Int
    rating: Float
    genre: [Genre!]
    imageUrl: String
  }

  type Library {
    id: ID!
    name: String!
    books: [Book]
  }

  input CreateBook {
    GSI1SK: String!
    title: String!
    price: String!
    publishingYear: String!
    publisher: String!
    description: String!
    page: Int!
    rating: Float!
    genre: [Genre!]!
  }

  input CreateLibrary {
    name: String!
    bookId: ID!
  }

  input CreateAuthor {
    name: String!
    age: String!
  }
`;
export default typeDefs;
