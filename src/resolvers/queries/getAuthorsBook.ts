import AWS from 'aws-sdk';

async function getAuthorsBook(id: string) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    KeyConditionExpression: 'PK = :hkey and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':hkey': 'BOOKS',
      ':sk': 'BOOK#',
    },
  };

  try {
    const { Items } = await dynamoDb.query(params).promise();

    const AuthorsWithBooks = Items && Items.filter((i) => i.GSI1SK === id);
    return AuthorsWithBooks;
  } catch (err) {
    console.log('error fetching from DDB: ', err);
    return err;
  }
}

export default getAuthorsBook;
