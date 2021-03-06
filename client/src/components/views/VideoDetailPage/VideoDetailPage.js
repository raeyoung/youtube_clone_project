import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Commnet from "./Sections/Commnet";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [Video, setVideo] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    // Get Video Detail
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("Failed get to Video Info!");
      }
    });

    //Get All Comment Info
    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.comments);
        setComments(response.data.comments);
      } else {
        alert("Failed to get comment info!");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  if (Video.writer) {
    console.log(Video);

    const subscribeBtn = Video.writer_id !== localStorage.getItem("userId") && (
      <Subscribe
        userTo={Video.writer_id}
        userFrom={localStorage.getItem("userId")}
      />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            />

            <List.Item
              actions={[
                <LikeDislikes
                  video
                  userId={localStorage.getItem("userId")}
                  videoId={videoId}
                />,
                subscribeBtn,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="https://ant.design">{Video.title}</a>}
                description={Video.description}
              />
              <div></div>
            </List.Item>

            <Commnet
              commentLists={Comments}
              postId={videoId}
              refreshFunction={refreshFunction}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
