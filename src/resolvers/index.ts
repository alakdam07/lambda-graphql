import { Author, Book } from '../generated/schema';
import createAuthor from './mutations/createAuthor';
import createBook from './mutations/createBook';
import createLibrary from './mutations/createLibrary';
import author from './queries/author';
import authors from './queries/authors';
import book from './queries/book';
import books from './queries/books';
import getAuthorsBook from './queries/getAuthorsBook';
import getBooksWithAuthor from './queries/getBooksWithAuthor';
import libraries from './queries/libraries';
import library from './queries/library';

const resolvers = {
  Query: {
    books,
    authors,
    author,
    book,
    library,
    libraries,
  },
  Mutation: {
    createBook,
    createAuthor,
    createLibrary,
  },
  Author: {
    book: (parent: Pick<Author, 'SK'>) => {
      return getAuthorsBook(parent.SK); // parent is the author - resolver should return a list of books
    },
  },

  Book: {
    author: (parent: Pick<Book, 'GSI1SK'>) => {
      return getBooksWithAuthor(parent.GSI1SK);
    },
  },
};

export default resolvers;
