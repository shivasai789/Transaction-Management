const express = require("express")
const {createUser,userDetails} = require("../controllers/user-controller")
const router = express.Router()

router.post('/create',createUser)
router.get('/',userDetails)

module.exports = router