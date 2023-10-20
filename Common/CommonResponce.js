const responseMessage = {
  success: (data, message) => {
    return {
      success: true,
      data: data,
      message: message,
      status: 200,
    };
  },
  error: (message) => {
    return {
      success: false,
      error: message,
    };
  },
};

module.exports = responseMessage;
