const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             COMMENT
//=================================

// save comment
router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  // 모든 정보를 mongoDB 에 저장
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

//Get All Comment Info
router.post("/getComments", (req, res) => {
  Comment.find({ videoId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
