const express = require('express');
const router = express.Router();
const ImpressionController = require('../controllers/impressionController');


//get all impressions
router.get('/', ImpressionController.allImpressions);

router.get('/annonce/:id', ImpressionController.getImpressionsByAdvretisementId);

router.post('/annonces/', ImpressionController.getImpressionsByAdvretisementsId);

// //get impression by id 
router.get('/:id', ImpressionController.impressionById);

//create impression 
router.post('/', ImpressionController.createImpression);


module.exports = router;