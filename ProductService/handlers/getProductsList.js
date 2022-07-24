import { Client } from 'pg';
import { dbConfig } from '../configs/RDS';
import { CustomError, handlerResponse } from '../helpers';

export const getProductsList = async (event) => {
  console.log(' --- event ---', JSON.stringify(event));

  const { requestContext } = event;

  if (requestContext.http.method !== 'GET') {
    throw new CustomError('only Get method allowed', 400 )
  }
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const { rows: products } = await client.query('select * from products left join stocks on products.id = stocks.product_id')
    console.log('dbResult', JSON.stringify(products));

    return products
  } catch (error) {
    throw new CustomError(`issues with db connection: ${error}`, 500 )
  } finally {
    client.end();
  }
};

export const handler = (event) => handlerResponse(() => getProductsList(event))
