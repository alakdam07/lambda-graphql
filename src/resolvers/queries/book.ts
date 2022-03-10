import AWS from 'aws-sdk';

async function book(_: any, args: { bookId: string }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    KeyConditionExpression: 'PK = :hkey and SK= :skey',
    ExpressionAttributeValues: {
      ':hkey': 'BOOKS',
      ':skey': `BOOK#${args.bookId}`,
    },
    Limit: 1,
  };

  try {
    const { Items } = await dynamoDb.query(params).promise();

    return Items && Items[0];
  } catch (err) {
    console.log('error fetching from DDB: ', err);
    return err;
  }
}

export default book;
