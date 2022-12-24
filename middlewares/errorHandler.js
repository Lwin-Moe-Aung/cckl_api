const errorHandler = (error, req, res, next) => {
    console.log(error);
    //* Custom Errors
    if (error.name === "UnprocessableEntityError") {
        return res.status(400).send({
            type: "ValidationError",
            message: error.message,
        });
    }

    // if (error instanceof AppError) {
    //     return res.status(error.statusCode).json({
    //     errorCode: error.errorCode,
    //     });
    // }
    return res.status(400).send({
        type: "errors",
        message: error.message,
    });

};

module.exports = errorHandler;
