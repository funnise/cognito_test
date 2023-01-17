import { Handler } from "aws-lambda"
const https = require('https');
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
let url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"   
// const TABLE_NAME = process.env.TABLE_NAME || "";
// const PRIMARY_KEY = process.env.PRIMARY_KEY || "";

export const handler = async (event: any = {}, context: any): Promise<any> => {
  const RESPONSE_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,access-token",
  };
  console.log(event);
  console.log(context);
  console.log(`(event.routeKey: ${event?.routeKey}`);
  const requestBody = event?.body
  /*
  const requestedItemId = event.pathParameters?.id;
    if (!requestedItemId) {
      return {
        statusCode: 400,
        body: `Error: You are missing the path parameter id`,
      };
    }*/

  //let requestJSON = JSON.parse(event.body);
  //console.log(`requestJSON: ${requestJSON}`);
  /*
  const requestedItemId = event.pathParameters?.id;
    if (!requestedItemId) {
      return {
        statusCode: 400,
        body: `Error: You are missing the path parameter id`,
      };
    }*/

  try {
    console.log(requestBody["price"])
    console.log(`requestBody["name"]: ${requestBody["name"]}`)
    const response = await db.put({
      TableName: 'items',
      Item: {
        itemId: '1234',
        price: 500,
        name:'name'
      }
    }).promise().catch((err: Error) => console.log(err));
    console.log(`response.Item: ${response.Item}`);
      return { 
        statusCode: 200, 
        body: JSON.stringify(response.Item),
        headers: RESPONSE_HEADERS,
      };
    } catch (dbError) {
      return { 
        statusCode: 500, 
        body: JSON.stringify(dbError),
        headers: RESPONSE_HEADERS,
      };
  }
};