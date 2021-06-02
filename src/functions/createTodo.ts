import { APIGatewayProxyHandler } from "aws-lambda"
import { v4 as uuid } from 'uuid';


import { document } from '../utils/dynamodbClient';

interface ICreateTODO {
    title: string;
    deadline: Date;
}


export const handle: APIGatewayProxyHandler = async (event) => {

    const { title, deadline } = JSON.parse(event.body) as ICreateTODO;

    const { id } = event.pathParameters;

    await document.put({
        TableName: 'todos',
        Item: {
            id: uuid(),
            user_id: id,
            title,
            deadline,
            done: false
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'success' }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
}