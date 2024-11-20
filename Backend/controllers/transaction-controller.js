const Transaction = require("../models/Transaction");
const User = require("../models/User");
const mongoose = require("mongoose");

const newTransaction = async (req, res) => {
  try {
    const { userId, amount, transactionType } = req.body;

    if (!amount || !transactionType || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const transaction = new Transaction({
      user_id: userId,
      amount: mongoose.Types.Decimal128.fromString(amount),
      transaction_type: transactionType,
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId query parameter is required.",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const transactions = await Transaction.find({ user_id: userId });

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    const transaction = await Transaction.findOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found!",
      });
    }

    transaction.status = status;

    await transaction.save();

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getTransactionDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getAllTransactions,
  updateTransaction,
  newTransaction,
  getTransactionDetails,
};
