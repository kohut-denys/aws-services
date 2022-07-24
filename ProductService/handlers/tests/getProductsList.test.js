import { handler } from '../getProductsList';

describe('getProductsList handler', () => {
  it('getProductsList handler should return list of products', async () => {
    const eventMock = {
      requestContext: {
        http: {
          method: "GET"
        }
      }
    }

    const handlerResponse = await handler(eventMock);
    const products = JSON.parse(handlerResponse.body)

    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0)
  })

  it('getProductsList handler should return an error if method is not a GET', async () => {
    const eventMock = {
      requestContext: {
        http: {
          method: "POST"
        }
      }
    }

    const handlerResponse = await handler(eventMock);
    expect(handlerResponse.errorMessage).toEqual("only Get method allowed");
    expect(handlerResponse.statusCode).toEqual(500);
  })
});
