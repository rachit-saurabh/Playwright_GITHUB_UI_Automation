exports.generateUniqueName = (prefix) => {
  return `${prefix}-${Date.now()}`;
};