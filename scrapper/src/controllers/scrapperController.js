const { scrapByCode } = require('../services/scrapperService');


const scrape = async (req, res) => {
    const response = await scrapByCode(req.params.code);
    return res.status(200).json(response);
}

module.exports = {
  scrape
}