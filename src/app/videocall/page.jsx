import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const VideoUi = dynamic(() => import("../../components/videocall/page"), {
  ssr: false,
});
// import Videocall from "../videocall/page";

const videocall = () => {
  return (
    <div>
      <VideoUi />
    </div>
  );
};

export default videocall;
