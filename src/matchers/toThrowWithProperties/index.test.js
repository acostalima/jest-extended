import matcher from './';

expect.extend(matcher);

const fixtureProperties = { foo: 'foo', bar: 'bar' };

describe('.toThrowWithProperties', () => {
  test('passes when error contains properties', () => {
    const error = Object.assign(new Error('error'), fixtureProperties);

    expect(() => {
      throw error;
    }).toThrowWithProperties(fixtureProperties);
  });

  test('fails when error does not contain properties', () => {
    expect(() =>
      expect(() => {
        throw new Error('error');
      }).toThrowWithProperties(fixtureProperties)
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toThrowWithProperties', () => {
  test('passes when error does not contain properties', () => {
    const error = Object.assign(new Error('error'), { foo: 'foo' });

    expect(() => {
      throw error;
    }).not.toThrowWithProperties(fixtureProperties);
  });

  test('fails when error contains properties', () => {
    const error = Object.assign(new Error('error'), fixtureProperties);

    expect(() =>
      expect(() => {
        throw error;
      }).not.toThrowWithProperties(fixtureProperties)
    ).toThrowErrorMatchingSnapshot();
  });
});
