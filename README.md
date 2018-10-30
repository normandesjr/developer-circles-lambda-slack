# Demo for Developer Circle - Lambda with Slack


## Create table in DynamoDB

```
aws dynamodb create-table --table-name order --attribute-definitions AttributeName=order_id,AttributeType=S AttributeName=order_date,AttributeType=S --key-schema AttributeName=order_id,KeyType=HASH AttributeName=order_date,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

## Insert item in beer table

```
aws dynamodb put-item --table-name order --item file://beers/rota-cerrado-1.json
```

