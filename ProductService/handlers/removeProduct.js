import { Client } from 'pg';
import { dbConfig } from '../configs/RDS';
import { CustomError, handlerResponse } from '../helpers';

export const removeProduct = async (event) => {
  console.log(' --- event ---', JSON.stringify(event));

  const { requestContext, pathParameters = {} } = event;

  if (requestContext.http.method !== 'DELETE') {
    throw new CustomError('only Delete method allowed', 400 )
  }

  const { productId } = pathParameters;

  if (!productId) {
    throw new CustomError('id should be passed', 400 )
  }

  const client = new Client(dbConfig);

  try {
    await client.connect()
    await client.query(`delete from stocks s where s.product_id = '${productId}'`)
    await client.query(`delete from products p where p.id = '${productId}'`)
  } catch (error) {
    throw new CustomError(`issues with db connection: ${error}`, 500 )
  } finally {
    client.end();
  }
};

export const handler = (event) => handlerResponse(() => removeProduct(event))
