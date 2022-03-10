import AWS from 'aws-sdk';

async function books(_: any, args: { book: string }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    KeyConditionExpression: 'PK = :hkey',
    ExpressionAttributeValues: {
      ':hkey': `${args.book}`,
    },
  };

  const { Items } = await dynamoDb.query(params).promise();

  return Items && Items;
}

export default books;
