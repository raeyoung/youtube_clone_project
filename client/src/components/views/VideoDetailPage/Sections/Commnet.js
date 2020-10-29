import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

function Commnet(props) {
  const videoId = props.postId;
  const user = useSelector((state) => state.user); // redux store 내에 user 정보 가져오기
  const [commentValue, setcommentValue] = useState("");

  //content 내용 적을 때 해당 값 가져오기 없을 경우 글이 작성되지 않음
  const handleClick = (e) => {
    setcommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue, //textarea 에 입력된 값
      writer: user.userData._id,
      postId: videoId,
    };

    // Save Comment
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);

        setcommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save comment!");
      }
    });
  };
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment List */}
      {/* {console.log(props.commentLists)} */}

      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && ( // responseTo 가 없는 댓글만 출력 (원댓글)
              <SingleComment
                comment={comment}
                postId={props.postId}
                refreshFunction={props.refreshFunction}
              />
            )
        )}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", border: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해주세요."
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Commnet;
