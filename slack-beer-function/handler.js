'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const moment = require('libs/moment');
const numeral = require('libs/numeral');

module.exports.orderStatus = async (event, context) => {

  const today = moment().format('YYYY-MM-DD');

  const params = {
    ExpressionAttributeValues: {
      ":d": {
         S: `${today}`
       }
    }, 
    FilterExpression: "order_date = :d",
    TableName: "order"
  };

  let total = 0;
  let totalValue = 0;
  await dynamodb.scan(params, (err, data) => {
    total = data.Items.length;
    totalValue = data.Items.map(o => o.price).reduce((total, price) => total + parseFloat(price.N), 0);
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      "text": ":beer:",
      "attachments": [
        {
          "color": "#2eb886",
          "title": "Status of BeerStore",
          "fields": [
            {
              "title": "Total",
              "value": total,
              "short": true
            },
            {
              "title": "Valor",
              "value": numeral(totalValue).format('$0,0.00'),
              "short": true
            }
          ]
        }
      ]
    }),
  };

};
