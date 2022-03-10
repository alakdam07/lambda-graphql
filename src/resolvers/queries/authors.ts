import AWS from 'aws-sdk';
import { Authors } from '../../generated/schema';

async function authors(_: any, author: { author: Authors }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    KeyConditionExpression: 'PK= :hkey',
    ExpressionAttributeValues: {
      ':hkey': `${author.author}`,
    },
  };

  const { Items } = await dynamoDb.query(params).promise();

  return Items && Items;
}

export default authors;
