import { products } from '../mocks/products';
import { CustomError, delay, handlerResponse } from '../helpers';

export const getProductsList = async ({ requestContext }) => {
  if (requestContext.http.method !== 'GET') {
    throw new CustomError('only Get method allowed', 400 )
  }

  await delay(200) // DynamoDB delay imitation

  return products
};

export const handler = (event) => handlerResponse(() => getProductsList(event))
