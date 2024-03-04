"use client";
import React, { CSSProperties, useContext, useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";

const VideoUi = (props) => {
  const [videocall, setVideocall] = useState(false);
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState("");
  const [channel, setChannel] = useState(props.id);
  const { role } = useContext(AuthContext);
  const router = useRouter();

  const handleEnd = async () => {
    console.log("ending call");
    setVideocall(false);

    if (role === "employer") {
      const savedData = {
        id: props.id,
      };
      console.log(savedData);

      try {
        const res = await axios.delete(`/api/interview?id=${props.id}`, {});
        const data = res.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      router.push("/employer/interviewSchedule");
    } else {
      router.push("/user/interviews");
    }
  };

  //console.log(process.env.PUBLIC_AGORA_APP_ID);
  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <h1 style={styles.heading}>Jobify VideoCall</h1>
        {videocall ? (
          <>
            <div style={styles.nav}>
              <p style={{ fontSize: 20, width: 200 }}>
                You&apos;re {isHost ? "a host" : "an audience"}
              </p>
              <p style={styles.btn} onClick={() => setHost(!isHost)}>
                Change Role
              </p>
              <p style={styles.btn} onClick={() => setPinned(!isPinned)}>
                Change Layout
              </p>
            </div>
            <AgoraUIKit
              rtcProps={{
                appId: process.env.NEXT_PUBLIC_AGORA_APP_ID || "",
                channel: channel,
                token: null, // add your token if using app in secured mode
                role: isHost ? "host" : "audience",
                layout: isPinned ? layout.pin : layout.grid,
                enableScreensharing: true,
              }}
              rtmProps={{ username: username || "user", displayUsername: true }}
              callbacks={{
                EndCall: () => handleEnd(),
              }}
            />
          </>
        ) : (
          <div style={styles.nav}>
            <input
              style={styles.input}
              placeholder="nickname"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h3 style={styles.btn} onClick={() => setVideocall(true)}>
              Start Call
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  },
  heading: { textAlign: "center", marginBottom: 0 },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  nav: { display: "flex", justifyContent: "space-around" },
  btn: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: "4px 8px",
    color: "#ffffff",
    fontSize: 20,
  },
  input: { display: "flex", height: 24, alignSelf: "center" },
};

export default VideoUi;
