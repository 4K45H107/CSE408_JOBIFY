import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const VideoUi = dynamic(() => import("../../components/videocall/page"), {
  ssr: false,
});
// import Videocall from "../videocall/page";

const videocall = () => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");

  return (
    <div>
      <VideoUi />
    </div>
  );
};

export default videocall;
