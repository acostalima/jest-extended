import matcher from './';

expect.extend(matcher);

describe('.toHaveBeenCalledTimely', () => {
  test('fails when mock has not been called', () => {
    const mock = jest.fn();

    expect(() => expect(mock).toHaveBeenCalledTimely([2000])).toThrowErrorMatchingSnapshot();
  });

  test('fails when mock has not been called the mininum required number of times', () => {
    const mock = jest.fn();
    mock();
    mock();
    mock();
    mock.mock.invocationCallOrder[0] = 0;
    mock.mock.invocationCallOrder[1] = 2000;
    mock.mock.invocationCallOrder[2] = 4000;

    expect(() => expect(mock).toHaveBeenCalledTimely([2000, 4000, 16000])).toThrowErrorMatchingSnapshot();
  });

  test('passes when mock is called when mininum specified time intervals have elapsed', () => {
    const mock = jest.fn();
    mock();
    mock();
    mock();
    mock.mock.invocationCallOrder[0] = 0;
    mock.mock.invocationCallOrder[1] = 2000;
    mock.mock.invocationCallOrder[2] = 4000;
    mock.mock.invocationCallOrder[3] = 16000;

    expect(mock).toHaveBeenCalledTimely([2000, 4000, 16000]);
  });
});
