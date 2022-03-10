import AWS from 'aws-sdk';
import { Authors } from '../../generated/schema';

async function author(_: any, args: { author: Authors; authorId: string }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    Key: {
      PK: args.author,
      SK: `AUTHOR#${args.authorId}`,
    },
  };

  const { Item } = await dynamoDb.get(params).promise();

  return Item && Item;
}

export default author;
