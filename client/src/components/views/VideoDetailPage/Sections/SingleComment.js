import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import LikeDislikes from "./LikeDislikes";

const { TextArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState(""); // String 형태

  const user = useSelector((state) => state.user); // redux store 내에 user 정보 가져오기

  // Get comment value
  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.CommentValue);
  };

  // Reply open
  const onCLickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  // Submit
  const onSubmit = (e) => {
    e.preventDefault(); // Not Refresh

    const variables = {
      content: CommentValue, //textarea 에 입력된 값
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id, // 답글의 답글..
    };

    // Save Comment
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");

        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  const actions = [
    <LikeDislikes
      video
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span onClick={onCLickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", border: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해주세요."
          />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
