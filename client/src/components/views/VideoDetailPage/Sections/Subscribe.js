import React, { useState, useEffect } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscriberNumber(response.data.subscriberNumber);
      } else {
        alert("Failed to get information on the number of subscribers");
      }
    });

    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/subscribe/subscribed", subscribeVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("Failed to get information");
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribe ? "#CC0000" : "#AAAAAA"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscriberNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
