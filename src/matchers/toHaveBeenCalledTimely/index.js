import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

import predicate from './predicate';

const passMessage = (invocationCallOrder, expectedInvocationCallOrder) => () =>
  matcherHint('.not.toHaveBeenCalledTimely') +
  '\n\n' +
  'Expected mock to not have been called in specified time intervals:\n' +
  `  ${printExpected(expectedInvocationCallOrder)}\n` +
  'Received time intervals:\n' +
  `  ${printExpected(invocationCallOrder)}`;

const failMessage = (invocationCallOrder, expectedInvocationCallOrder) => () =>
  matcherHint('.toHaveBeenCalledTimely') +
  '\n\n' +
  'Expected mock to have been called in specified time intervals:\n' +
  `  ${printExpected(expectedInvocationCallOrder)}\n` +
  'Received time intervals:\n' +
  `  ${printExpected(invocationCallOrder)}`;

export default {
  toHaveBeenCalledTimely: (mock, expectedInvocationCallOrder) => {
    const pass = predicate(mock.mock.invocationCallOrder, expectedInvocationCallOrder);

    return {
      pass,
      message: pass ?
        passMessage(mock.mock.invocationCallOrder, expectedInvocationCallOrder) :
        failMessage(mock.mock.invocationCallOrder, expectedInvocationCallOrder)
    };
  }
};
