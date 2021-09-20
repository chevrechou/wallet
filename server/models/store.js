const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let store = new Schema(
  {
    category: {
      type: String,
    },
    items: {
      type: Array,
    },
    totalValue: {
      type: Number,
    },
    color: {
      type: String,
    },
  },
  {
    collection: "store",
  }
);

module.exports = mongoose.model("Store", store);
