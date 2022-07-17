import { handler } from '../getProductsById';

describe('getProductsById handler', () => {
  it('getProductsById handler should return product', async () => {
    const eventMock = {
      requestContext: {
        http: {
          method: "GET"
        }
      },
      pathParameters: {
        productId: '2621c7af-2aac-4fda-87ee-e99df1b9bc48'
      }
    }

    const handlerResponse = await handler(eventMock);
    const product = JSON.parse(handlerResponse.body)

    expect(Object.keys(product).sort()).toMatchObject([
      'description',
      'id',
      'image',
      'price',
      'quantity',
      'title',
      'year',
    ])
  })

  it('getProductsById handler should return an error if method is not a GET', async () => {
    const eventMock = {
      requestContext: {
        http: {
          method: "POST"
        }
      },
      pathParameters: {
        productId: '2621c7af-2aac-4fda-87ee-e99df1b9bc48'
      }
    }

    const handlerResponse = await handler(eventMock);
    expect(handlerResponse.errorMessage).toEqual("only Get method allowed");
    expect(handlerResponse.statusCode).toEqual(500);
  })

  it('getProductsById handler should return an error if product is not exist', async () => {
    const eventMock = {
      requestContext: {
        http: {
          method: "GET"
        }
      },
      pathParameters: {
        productId: 'bla-bla-bla'
      }
    }

    const handlerResponse = await handler(eventMock);
    expect(handlerResponse.errorMessage).toEqual("The product is not exist");
    expect(handlerResponse.statusCode).toEqual(500);
  })

  it('getProductsById handler should return an error if id is not passed', async () => {
    const eventMock = {
      requestContext: {
        http: {
          method: "GET"
        }
      }
    }

    const handlerResponse = await handler(eventMock);
    expect(handlerResponse.errorMessage).toEqual("id should be passed");
    expect(handlerResponse.statusCode).toEqual(500);
  })
});
