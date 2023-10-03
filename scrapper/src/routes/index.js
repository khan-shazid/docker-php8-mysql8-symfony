const express = require('express');
const router = express.Router();

const scrapperController = require('../controllers/scrapperController');

function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
  }

  router.get('/company/parse/:code', asyncHandler(scrapperController.scrape));

module.exports = router;
