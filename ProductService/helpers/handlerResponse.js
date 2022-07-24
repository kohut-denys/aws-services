import { CustomError } from "./customError";

export const handlerResponse = async (handler) => {
  try {
    const response = await handler();

    return {
      isBase64: false,
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  } catch (error) {
    if (error instanceof CustomError ) {
      return {
        isBase64: false,
        statusCode: error.statusCode || 500,
        body: JSON.stringify({ message: error.message || 'Something went wrong' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    }

    return {
      isBase64: false,
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  }
}
