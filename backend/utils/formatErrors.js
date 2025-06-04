function formatErrors(error) {
  const errors = {};
  error.details.forEach((detail) => {
    errors[detail.path[0]] = detail.message;
  });
  return errors;
}

module.exports = formatErrors;
