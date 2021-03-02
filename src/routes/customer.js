const express = require('express');
const router = express.Router();

const imeiController = require('../controllers/imeiController');

router.get('/', imeiController.init);
router.post('/show', imeiController.init);
router.post('/back', imeiController.back);

module.exports = router;