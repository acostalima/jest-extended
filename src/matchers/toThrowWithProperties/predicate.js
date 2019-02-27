import { equals } from '../../utils';

export default (error, properties) => {
  return Object.entries(properties).every(([key, value]) => error.hasOwnProperty(key) && equals(error[key], value));
};
