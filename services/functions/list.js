

import dynamoDb from '../util/dynamodb.js';
import handler from "../util/handler.js";

export const main = handler(async () => {

    const params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": "123"
        }
    };

    const result = await dynamoDb.query(params);
    return result.Items;
});