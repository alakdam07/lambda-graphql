import AWS from 'aws-sdk';
import { Libraries } from '../../generated/schema';

async function libraries(_: any, args: { library: Libraries }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  console.log(args.library);

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    KeyConditionExpression: 'PK = :hkey and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':hkey': args.library,
      ':sk': 'LIBRARY#',
    },
  };

  try {
    const { Items } = await dynamoDb.query(params).promise();

    return Items && Items;
  } catch (err) {
    console.log('error fetching from DDB: ', err);
    return err;
  }
}

export default libraries;
