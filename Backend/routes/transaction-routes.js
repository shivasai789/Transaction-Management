const express = require("express")
const {newTransaction,getAllTransactions,updateTransaction,getTransactionDetails} = require("../controllers/transaction-controller")

const router = express.Router()

router.post('/',newTransaction)
router.get('/',getAllTransactions)
router.put('/:transactionId',updateTransaction)
router.get('/:transactionId',getTransactionDetails)

module.exports = router