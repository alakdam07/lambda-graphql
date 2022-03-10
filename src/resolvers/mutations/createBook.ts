import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { CreateBook } from '../../generated/schema';

async function createBook(_: unknown, { input }: { input: CreateBook }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    Item: {
      PK: `BOOKS`,
      SK: `BOOK#${id}`,
      GSI1PK: `AUTHORS`,
      GSI1SK: input.GSI1SK,
      title: input.title,
      price: input.price,
      publishingYear: input.publishingYear,
      publisher: input.publisher,
      page: input.page,
      description: input.description,
      genre: input.genre,
      rating: input.rating,
    },
  };

  await dynamoDb.put(params).promise();

  return {
    ...input,
  };
}

export default createBook;
