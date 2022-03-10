import AWS from 'aws-sdk';

async function getBooksWithAuthor(id: string) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.ITEM_TABLE ? process.env.ITEM_TABLE : '',
    KeyConditionExpression: 'PK = :hkey and begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':hkey': 'AUTHORS',
      ':sk': `AUTHOR#`,
    },
  };

  try {
    const { Items } = await dynamoDb.query(params).promise();

    const AuthorsWithBooks =
      Items &&
      Items.find((i) => {
        if (i.SK === id) {
          return i;
        }
      });

    return AuthorsWithBooks;
  } catch (err) {
    console.log('error fetching from DDB: ', err);
    return err;
  }
}

export default getBooksWithAuthor;
