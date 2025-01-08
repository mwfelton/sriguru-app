import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const dynamoDbClient = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export default dynamoDbClient;