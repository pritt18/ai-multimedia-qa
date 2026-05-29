import { useEffect, useRef } from "react";

function MediaPlayer({ mediaUrl, startTime }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !mediaUrl) return;

    const playVideo = async () => {
      try {
        video.currentTime = startTime || 0;

        await video.play();

        console.log("Playing from:", startTime);
      } catch (error) {
        console.error("Video Play Error:", error);
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.onloadedmetadata = playVideo;
    }
  }, [startTime, mediaUrl]);

  return (
    <div className="mt-6">
      <video
        ref={videoRef}
        src={mediaUrl}
        controls
        width="100%"
        height="500"
        preload="auto"
        style={{
          borderRadius: "10px",
          backgroundColor: "#000",
        }}
      />

      <p className="mt-2 text-sm text-gray-300">
        Playing from: {Math.floor(startTime)} sec
      </p>

      <p
        className="mt-2 text-xs text-gray-400"
        style={{ wordBreak: "break-all" }}
      >
        Video URL: {mediaUrl}
      </p>
    </div>
  );
}

export default MediaPlayer;