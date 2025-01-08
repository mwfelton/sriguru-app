import { NextRequest, NextResponse } from "next/server";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDbClient from "../../../lib/dynamodbClient";

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
