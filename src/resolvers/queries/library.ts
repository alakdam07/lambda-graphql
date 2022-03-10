import AWS from 'aws-sdk';

async function library(_: any, args: { libraryId: string }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    Key: {
      PK: 'LIBRARIES',
      SK: `LIBRARY#${args.libraryId}`,
    },
  };

  try {
    const { Item } = await dynamoDb.get(params).promise();

    return Item && Item;
  } catch (err) {
    console.log('error fetching from DDB: ', err);
    return err;
  }
}

export default library;
