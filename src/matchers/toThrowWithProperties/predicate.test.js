import predicate from './predicate';

describe('.toThrowWithProperties', () => {
  test('passes when error contains nested properties', () => {
    expect(
      predicate(Object.assign(new Error('error'), { hello: { message: 'world' } }), { hello: { message: 'world' } })
    ).toBe(true);
  });

  test('passes when error contains properties', () => {
    expect(predicate(Object.assign(new Error('error'), { foo: 'foo', bar: 'bar' }), { foo: 'foo', bar: 'bar' })).toBe(
      true
    );
  });

  test('fails when error does not contain properties', () => {
    expect(predicate(Object.assign(new Error('error'), { foo: 'foo' }), { foo: 'foo', bar: 'bar' })).toBe(false);
  });
});
