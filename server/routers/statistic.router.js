const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var StatisticController = require('../controllers/statistic.controller');

router.get('/statistic-product', StatisticController.getStatsticProduct);
router.get('/statistic-order', StatisticController.getStatsticOrder);
router.get('/revenue-statistics-product', StatisticController.getRevenueStatsticProduct);
router.get('/statistic-account', StatisticController.getStatsticAccount);
module.exports = router;