import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        debugger;
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("Failed get to Video Info!");
      }
    });
  }, []);

  return (
    <Row>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${Video.filePath}`}
            controls
          />

          <List.Item.Meta
            avatar={<Avatar src={Video.writer && Video.writer.image} />}
            title={<a href="https://ant.design">{Video.title}</a>}
            description={Video.description}
          />
        </div>
      </Col>
      <Col lg={6} xs={24}>
        Side Videos
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
