export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  PK: Scalars['ID'];
  SK: Scalars['ID'];
  age?: Maybe<Scalars['String']>;
  book?: Maybe<Array<Maybe<Book>>>;
  name?: Maybe<Scalars['String']>;
};

export enum Authors {
  Authors = 'AUTHORS'
}

export type Book = {
  __typename?: 'Book';
  GSI1PK: Scalars['ID'];
  GSI1SK: Scalars['ID'];
  PK: Scalars['ID'];
  SK: Scalars['ID'];
  author?: Maybe<Author>;
  description?: Maybe<Scalars['String']>;
  genre?: Maybe<Array<Genre>>;
  imageUrl?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  publishingYear?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
};

export type CreateAuthor = {
  age: Scalars['String'];
  name: Scalars['String'];
};

export type CreateBook = {
  GSI1SK: Scalars['String'];
  description: Scalars['String'];
  genre: Array<Genre>;
  page: Scalars['Int'];
  price: Scalars['String'];
  publisher: Scalars['String'];
  publishingYear: Scalars['String'];
  rating: Scalars['Float'];
  title: Scalars['String'];
};

export type CreateLibrary = {
  bookId: Scalars['ID'];
  name: Scalars['String'];
};

export enum Genre {
  Adventure = 'adventure',
  Drama = 'drama',
  Scifi = 'scifi'
}

export enum Libraries {
  Libraries = 'LIBRARIES'
}

export type Library = {
  __typename?: 'Library';
  books?: Maybe<Array<Maybe<Book>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor?: Maybe<Author>;
  createBook?: Maybe<Book>;
  createLibrary?: Maybe<Library>;
};


export type MutationCreateAuthorArgs = {
  input: CreateAuthor;
};


export type MutationCreateBookArgs = {
  input: CreateBook;
};


export type MutationCreateLibraryArgs = {
  input: CreateLibrary;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors?: Maybe<Array<Maybe<Author>>>;
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  libraries?: Maybe<Array<Maybe<Library>>>;
  library?: Maybe<Library>;
};


export type QueryAuthorArgs = {
  author?: InputMaybe<Authors>;
  authorId?: InputMaybe<Scalars['String']>;
};


export type QueryAuthorsArgs = {
  author?: InputMaybe<Authors>;
};


export type QueryBookArgs = {
  bookId?: InputMaybe<Scalars['String']>;
};


export type QueryBooksArgs = {
  book?: InputMaybe<Scalars['String']>;
};


export type QueryLibrariesArgs = {
  library?: InputMaybe<Libraries>;
};


export type QueryLibraryArgs = {
  libraryId?: InputMaybe<Scalars['String']>;
};
