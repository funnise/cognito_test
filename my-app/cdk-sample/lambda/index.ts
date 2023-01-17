const https = require('https');
import { Handler } from "aws-lambda"
let url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"   

export const handler: Handler = async () => {
  console.log("Hello Lambda!")
  const RESPONSE_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,access-token",
  };
  return {
    statusCode: 200,
    headers: RESPONSE_HEADERS,
    body: "Hello Lambda!",
  };
}