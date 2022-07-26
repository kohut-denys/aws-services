import { Client } from 'pg';
import { dbConfig } from '../configs/RDS';
import { CustomError, handlerResponse } from '../helpers';

export const createProduct = async (event) => {
  console.log(' --- event ---', JSON.stringify(event));

  const { requestContext, body } = event;

  if (requestContext.http.method !== 'POST') {
    throw new CustomError('only Post method allowed', 400 )
  }

  const {
    title,
    description,
    image,
    price,
    count,
    year,
  } = JSON.parse(body)

  const numbers = [price, count, year];

  if (!image.match(/^http/) || numbers.some(num => typeof num !== 'number')) {
    throw new CustomError('product data is invalid', 400 )
  }

  const client = new Client(dbConfig);

  try {
    await client.connect()
    const { rows: [{ id }] } = await client.query(`insert into products (title, description, image, price, year) values
        ('${title}', '${description}', '${image}', ${price}, ${year}) RETURNING id
    `)
    if (id) {
      await client.query(`insert into stocks (product_id, count) values
        ('${id}', '${count}')
    `)
    }
  } catch (error) {
    throw new CustomError(`issues with db connection: ${error}`, 500 )
  } finally {
    client.end();
  }
};

export const handler = (event) => handlerResponse(() => createProduct(event))
