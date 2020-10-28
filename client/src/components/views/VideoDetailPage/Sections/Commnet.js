import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

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

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
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
