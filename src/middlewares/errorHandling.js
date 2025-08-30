exports.errorHandling = (err, req, res, next) => {
    // console.error(err);

    res.send({
        err: true,
        message: err.message,
    });
};
