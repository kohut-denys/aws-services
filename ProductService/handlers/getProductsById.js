import { products } from '../mocks/products';
import { delay, handlerResponse, CustomError }  from '../helpers';

export const getProductsById = async ({ requestContext, pathParameters = {} }) => {
  if (requestContext.http.method !== 'GET') {
    throw new CustomError('only Get method allowed', 400 )
  }

  const { productId } = pathParameters;

  if (!productId) {
    throw new CustomError('id should be passed', 400 )
  }

  const product = products.find(({ id }) => id === productId)

  if (!product) {
    throw new CustomError('Product not Found', 404 )
  }

  await delay(200) // DynamoDB delay imitation

  return product
};

export const handler = (event) => handlerResponse(() => getProductsById(event))
