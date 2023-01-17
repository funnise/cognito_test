import { Handler } from "aws-lambda"
const https = require('https');
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
let url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"   
const TABLE_NAME = process.env.TABLE_NAME || "";
const PRIMARY_KEY = process.env.PRIMARY_KEY || "";

export const handler = async (event: any = {}, context: any): Promise<any> => {
 
  const RESPONSE_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,access-token",
  };
  console.log(event?.routeKey);
  console.log(context);
  /*
  const requestedItemId = event.pathParameters?.id;
    if (!requestedItemId) {
      return {
        statusCode: 400,
        body: `Error: You are missing the path parameter id`,
      };
    }*/
  return { 
    statusCode: 200, 
    body: JSON.stringify(event),
  headers: RESPONSE_HEADERS, 
};
  /*
  try {

    const response = await db.get({
      TABLE_NAME: 'items',
      Item: {
        id: '123',
        price: 3000,
        name: 'test'
      }
    }).promise().catch((err: Error) => console.log(err));
    console.log(`response.Item: ${response.Item}`);
    
    } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError) };
  }*/
};