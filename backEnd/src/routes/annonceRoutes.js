const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const AnnonceController = require('../controllers/annonceController');

router.get('/', AnnonceController.allAnnonces);

router.get('/user/:id', AnnonceController.getAdvretisementsByUserId);

router.get('/:id', AnnonceController.annonceById)

// router.post('/', authMiddleware , AnnonceController.createAnnonce);
router.post('/' , AnnonceController.createAnnonce);

router.put('/:id', AnnonceController.updateAnnonce);

router.delete('/:id', AnnonceController.deleteAnnonce);



module.exports = router;