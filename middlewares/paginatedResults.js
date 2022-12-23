const paginatedResults = (model) => {
  return async (req, res, next) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }

    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 50) && !(sizeAsNumber < 1)){
        size = sizeAsNumber;
    }

    try {
      const results = await model.findAndCountAll({
                              limit: size,
                              offset: page * size
                            });

      res.paginatedResults = results.rows
      res.totalPages =  Math.ceil(results.count / Number.parseInt(size))
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = paginatedResults
