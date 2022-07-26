import { Client } from 'pg';
import { dbConfig } from '../configs/RDS';
import { delay, handlerResponse, CustomError }  from '../helpers'

export const getProductsById = async (event) => {
  console.log(' --- event ---', JSON.stringify(event));

  const { requestContext, pathParameters = {} } = event;

  if (requestContext.http.method !== 'GET') {
    throw new CustomError('only Get method allowed', 400 )
  }

  const { productId } = pathParameters;

  if (!productId) {
    throw new CustomError('id should be passed', 400 )
  }

  const client = new Client(dbConfig);

  try {
    await client.connect();
    const { rows } = await client.query(`select * from (select * from products p where p.id = '${productId}') products left join stocks on products.id = stocks.product_id`)
    console.log('dbResult', JSON.stringify(rows));

    return rows[0]
  } catch (error) {
    console.error(error)
    throw new CustomError(`issues with db connection: ${error}`, error.statusCode || 500 )
  } finally {
    client.end();
  }
};

export const handler = (event) => handlerResponse(() => getProductsById(event))
