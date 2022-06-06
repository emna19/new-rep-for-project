const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController')

router.get('/', TransactionController.allTransactions);

router.get('/:id', TransactionController.transactionById)

router.post('/', TransactionController.createTransaction);

module.exports = router;