const mongoose = require("mongoose")

const TransactionSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    amount: {
        type: mongoose.Schema.Types.Decimal128, required: true
    },
    transaction_type: {
        type: String,
        enum: ["DEPOSIT", "WITHDRAWAL"],
        required: true
    },
    status : {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        required: true,
        default: "PENDING"
    },
},
{ timestamps: true })

const Transaction = mongoose.model("Transaction",TransactionSchema)

module.exports = Transaction