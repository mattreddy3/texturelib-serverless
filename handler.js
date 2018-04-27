'use strict';
// require('dotenv').config();

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const {Client} = require('pg')



module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: {
      "message":"Test success!"},
    };
    
    callback(null, response);
    
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  };
  
  module.exports.getTextures = async (event, context, callback) => {
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 5432
    });
    await client.connect();
    console.log('connected to db');
    var results = [];
    var res = await client.query("SELECT * FROM users");
    res.rows.forEach((row)=>{
      results.push(row)
    });
    await client.end();
    console.log('client closed');
    context.succeed(results);
    // let response = {
    //   statusCode:200,
    //   body:JSON.stringify(results)
    // };
    // return response;
    // let response = {
    //   "statusCode": 200,
    //   "headers": {
    //     "my_header": "my_value"
    //   },
    //   "body":JSON.stringify(users),
    //   // "isBase64Encoded": false
    // };
    // return response;
  }
  