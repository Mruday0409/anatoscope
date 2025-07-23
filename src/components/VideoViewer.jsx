import React from "react";

const VideoViewer = ({ videoPath }) => {
  return (
    <div className="video-container">
      <video
        src={videoPath}
        autoPlay
        muted
        loop
        playsInline
        className="organ-video"
      />
    </div>
  );
};

export default VideoViewer;
