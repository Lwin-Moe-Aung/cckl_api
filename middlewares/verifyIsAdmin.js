const verifyIsAdmin = () => {
    return (req, res, next) => {
        if (!req?.is_admin || !req.is_admin ) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyIsAdmin