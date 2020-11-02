import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNum, setChildCommentNum] = useState(0); // 답글의 답글 갯수
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNum = 0;

    props.commentLists.map((comment) => {
      // parent Comment 와 reply comment 의 id 가 같을 경우 렌더링
      if (comment.responseTo === props.parentCommentId) {
        commentNum++;
      }
      setChildCommentNum(commentNum);
    });
  }, []);

  const renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              commentLists={props.commentLists}
              parentCommentId={comment._id}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };
  return (
    <div>
      {ChildCommentNum > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandleChange}
        >
          View {ChildCommentNum} more Comment(s)
        </p>
      )}
      {/* replyComment 가 존재할 경우에만 렌더링 */}
      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
