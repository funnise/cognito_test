import { Handler } from "aws-lambda"
const https = require('https');
const AWS = require("aws-sdk");
var uuid = require('uuid');
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
  /*
  console.log(`TABLE_NAME: ${TABLE_NAME}`);
  console.log(`PRIMARY_KEY: ${PRIMARY_KEY}`);
  console.log(event);
  console.log(context);
  console.log(`(event.routeKey: ${event?.routeKey}`);*/
  const requestBody = event?.body
  console.log(requestBody);
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
    return { 
      statusCode: 200, 
      body:{},
      headers: RESPONSE_HEADERS,
    };
    /*
  try {
    console.log(uuid.v4())
    const response = await db.post({
      TableName: TABLE_NAME,
      Item: {
        itemId: uuid.v4(),
        price: 500,
        name:'name'
      }
    }).promise().catch((err: Error) =>{
      console.log(`catch err: ${err}`);
      throw err
    });
      
    } catch (dbError) {
      console.log(JSON.stringify(dbError))
      return { 
        statusCode: 500, 
        body: JSON.stringify(dbError),
        headers: RESPONSE_HEADERS,
      };
  }*/
};