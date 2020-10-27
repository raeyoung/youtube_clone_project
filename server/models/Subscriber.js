const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema(
  {
    // 동영상 올린 사람의 정보
    userTo: {
      type: Schema.Types.ObjectId, // // User.js 에 있는 정보 모두 긁어오기
      ref: "User",
    },
    // 구독자
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = { Subscriber };
