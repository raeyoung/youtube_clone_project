import React, { useState, useEffect } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }
  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setLikes(response.data.likes.length);

        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikes(response.data.dislikes.length);

        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);
  return (
    <div>
      {/* like */}
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Likes}</span>
      </span>

      {/* dislike */}
      <span key="comment-basic-dislike">
        <Tooltip title="DisLike">
          <Icon
            type="dislike"
            theme={DislikeAction === "disliked" ? "outlined" : "filled"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Dislikes} </span>
      </span>
    </div>
  );
}

export default LikeDislikes;