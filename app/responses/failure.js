const ErrorHandler = require('@/common/ErrorHandler');

const failure = (data, language = 'vi') => {
  const { errcode, ...restData } = data;
  return {
    status: 'e',
    message: `${errcode} ${ErrorHandler.getErrorMessageByCode(errcode, language)}`,
    ...restData,
  };
};

module.exports = failure;
