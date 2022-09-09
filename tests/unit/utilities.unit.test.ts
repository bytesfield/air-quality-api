import * as utilities from '../../src/core/helpers/utilities.helper';

describe('tests for responseHandler', () => {
  test('should return an obj with the payload arg returned as the value of data key and message as success when no message arg is passed', () => {
    expect(utilities.responseHandler({ city: 'Ney York', country: 'USA' })).toMatchObject({
      status: true,
      message: 'success',
      data: { city: 'Ney York', country: 'USA' }
    });
  });

  test('should return an obj with the payload arg returned as the value of data key and message arg returned as the value of the message key', () => {
    expect(utilities.responseHandler({ city: 'Ney York', country: 'USA' }, 'Payment successful.')).toMatchObject({
      status: true,
      message: 'Payment successful.',
      data: { city: 'Ney York', country: 'USA' }
    });
  });
});
