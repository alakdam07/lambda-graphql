import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { CreateAuthor } from '../../generated/schema';

async function createAuthor(_: unknown, { input }: { input: CreateAuthor }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    Item: {
      PK: `AUTHORS`,
      SK: `AUTHOR#${id}`,
      GSI1PK: `AUTHORS`,
      GSI1SK: `AUTHOR#${id}`,
      name: input.name,
      age: input.age,
    },
  };

  await dynamoDb.put(params).promise();

  return {
    ...input,
  };
}

export default createAuthor;
