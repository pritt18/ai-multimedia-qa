import ReactPlayer from "react-player";

import { useRef, useState } from "react";


function MediaPlayer({
  mediaUrl,
  startTime
}) {

  const playerRef = useRef(null);

  const [playing, setPlaying] =
    useState(false);


  const handleReady = () => {

    if (
      playerRef.current &&
      typeof playerRef.current.seekTo === "function"
    ) {

      playerRef.current.seekTo(
        startTime,
        "seconds"
      );

      setPlaying(true);
    }
  };


  return (

    <div className="mt-6">

      <ReactPlayer
        ref={playerRef}
        url={mediaUrl}
        controls={true}
        playing={playing}
        onReady={handleReady}
        width="100%"
        height="80px"
        volume={1}
        muted={false}
      />

      <p className="mt-2 text-sm text-gray-300">

        Playing from:
        {" "}
        {startTime}
        sec

      </p>

    </div>
  );
}

export default MediaPlayer;