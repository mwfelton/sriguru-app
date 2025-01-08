import { NextRequest, NextResponse } from "next/server";
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import dynamoDbClient from "../../../lib/dynamodbClient";

const TABLE_NAME = "YogaAppData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received payload:", body);

    // Validate the payload
    if (!Array.isArray(body) || body.length === 0) {
      console.error("Invalid payload:", body);
      return NextResponse.json(
        { error: "Invalid payload: Expected an array of practices." },
        { status: 400 }
      );
    }

    // Map the payload to DynamoDB format
    const requestItems = body.map((practice: any) => ({
      PutRequest: {
        Item: {
          userId: { S: practice.userId },
          dataType: { S: practice.dataType },
          practiceName: { S: practice.practiceName },
          timestamp: { S: practice.timestamp },
        },
      },
    }));

    const params = {
      RequestItems: {
        [TABLE_NAME]: requestItems,
      },
    };

    console.log("DynamoDB Request Parameters:", params);

    const command = new BatchWriteItemCommand(params);
    const result = await dynamoDbClient.send(command);

    console.log("DynamoDB Response:", result);

    if (result.UnprocessedItems && Object.keys(result.UnprocessedItems).length > 0) {
      console.warn("Unprocessed Items:", result.UnprocessedItems);
      return NextResponse.json(
        { message: "Some items were not processed.", unprocessed: result.UnprocessedItems },
        { status: 207 }
      );
    }

    return NextResponse.json({ message: "Practices saved successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error saving practices:", error);
    return NextResponse.json({ error: "Failed to save practices." }, { status: 500 });
  }
}
