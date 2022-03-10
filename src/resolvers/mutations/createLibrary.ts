import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { CreateLibrary } from '../../generated/schema';

async function createLibrary(_: unknown, { input }: { input: CreateLibrary }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    Item: {
      name: input.name,
      PK: `LIBRARIES`,
      SK: `LIBRARY#${id}`,
      GSI1PK: 'BOOKS',
      GSI1SK: input.bookId,
    },
  };

  await dynamoDb.put(params).promise();

  return {
    ...input,
  };
}

export default createLibrary;
