const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             LIKE
//=================================

// Like info
router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, likes });
  });
});

// Dislike info
router.post("/getDislikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Like.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, dislikes });
  });
});

// up like
router.post("/uplkie", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  const like = new Like(variable);

  //save the like info data in DB
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });

    //In case disLike Button is already clicked, we need to decrease the dislike by 1
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

// unLike
router.post("/unLike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
