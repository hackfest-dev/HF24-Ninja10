function errorHandler(res, statusCode, message) {
    res.status(statusCode).json({
        status: 'fail',
        message: message,
    });
}

export default errorHandler;
