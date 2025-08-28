exports.errorHandling = (err, req, res, next) => {
    console.error(err);

    res.send(err.message);
};
