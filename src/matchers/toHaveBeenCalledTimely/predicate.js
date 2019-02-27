export default (invocationCallOrder, expectedInvocationCallOrder) => {
  if (invocationCallOrder.length === 0) {
    return false;
  }

  if (invocationCallOrder.length === expectedInvocationCallOrder.length) {
    return false;
  }

  return invocationCallOrder.map((order, index) => {
    if (index === 0) {
      return true;
    }

    return expectedInvocationCallOrder[index - 1] ?
      invocationCallOrder[index] >= expectedInvocationCallOrder[index - 1] :
      false;
  }).reduce((isMockTimely, wasInvokedTimely) => isMockTimely || wasInvokedTimely);
};
