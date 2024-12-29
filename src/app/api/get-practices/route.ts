import { NextRequest, NextResponse } from "next/server";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Configure DynamoDB Client
const dynamoDbClient = new DynamoDB({
  region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

// Create a DocumentClient
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

export async function GET() {
  const params = {
    TableName: "YogaAppData",
    KeyConditionExpression: "userId = :userId AND begins_with(dataType, :practicePrefix)",
    ExpressionAttributeValues: {
      ":userId": "admin",
      ":practicePrefix": "practice#",
    },
  };

  try {
    const data = await dynamoDb.send(new QueryCommand(params));
    return NextResponse.json(data.Items);
  } catch (error) {
    console.error("Error fetching practices:", error);
    return NextResponse.json({ error: "Could not fetch practices" }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import { DynamoDB } from "aws-sdk";

// const dynamoDb = new DynamoDB.DocumentClient({
//     region: process.env.NEXT_PUBLIC_COGNITO_REGION, // Ensure this is defined in .env.local
// });

// export async function GET() {
//   const params = {
//     TableName: "YogaAppData",
//     KeyConditionExpression: "userId = :userId AND begins_with(dataType, :practicePrefix)",
//     ExpressionAttributeValues: {
//     ":userId": "admin",
//     ":practicePrefix": "practice#",
//     },
//   };

//   try {
//     const data = await dynamoDb.query(params).promise();
//     return NextResponse.json(data.Items);
//   } catch (error) {
//     console.error("Error fetching practices:", error);
//     return NextResponse.json({ error: "Could not fetch practices" }, { status: 500 });
//   }
// }
