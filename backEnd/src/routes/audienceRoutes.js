const express = require('express');
const router = express.Router();
const AudienceController = require('../controllers/audienceController');

//create audience
router.post('/', AudienceController.createAudience);
  //get all types of audience
router.get('/', AudienceController.allAudiences);
  //get audience by id 
router.get('/:id', AudienceController.audienceById);

router.get('/user/:id', AudienceController.getAudiencesByUserId)

router.put('/:id', AudienceController.updateAudience);

router.delete('/:id', AudienceController.deleteAudience);

module.exports = router;