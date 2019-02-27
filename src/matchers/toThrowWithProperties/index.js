import { isNot, matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

import predicate from './predicate';

const positiveHint = matcherHint('.toThrowWithProperties', 'function', 'properties');
const negativeHint = matcherHint('.not.toThrowWithProperties', 'function', 'properties');

const passMessage = (received, expected) => () =>
  negativeHint +
  '\n\n' +
  'Expected not to throw with:\n' +
  `  ${printExpected(expected)}\n` +
  'Thrown with:\n' +
  `  ${printReceived(received)}\n`;

const failMessage = (received, expected) => () =>
  positiveHint +
  '\n\n' +
  'Expected to throw with:\n' +
  `  ${printExpected(expected)}\n` +
  'Thrown with:\n' +
  `  ${printReceived(received)}\n`;

export default {
  toThrowWithProperties: (fn, expectedProperties) => {
    const hint = isNot ? negativeHint : positiveHint;

    if (!fn || typeof fn !== 'function') {
      return {
        pass: false,
        message: () => hint + '\n\n' + `Received value must be a function but instead "${fn}" was found`
      };
    }

    if (!expectedProperties) {
      return {
        pass: false,
        message: () => hint + '\n\n' + 'Properties argument is required'
      };
    }

    let receivedError;
    try {
      fn();
    } catch (e) {
      receivedError = e;
    }

    if (!receivedError) {
      return {
        pass: false,
        message: () => 'Expected function to throw an error.\n' + "But it didn't throw anything."
      };
    }

    const receivedProperties = Object.keys(receivedError).reduce(
      (properties, propName) => ({
        ...properties,
        [propName]: receivedError[propName]
      }),
      {}
    );

    const pass = predicate(receivedError, expectedProperties);

    if (pass) {
      return { pass: true, message: passMessage(receivedProperties, expectedProperties) };
    }

    return { pass: false, message: failMessage(receivedProperties, expectedProperties) };
  }
};
