exports.generateUniqueName = (prefix) => {
  const formatted = new Date()
    .toLocaleString('en-IN', { hour12: false })
    .replace(/[/:, ]/g, '-');

  return `${prefix}-${formatted}`;
};