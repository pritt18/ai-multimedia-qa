import { useEffect, useRef } from "react";


function MediaPlayer({
  mediaUrl,
  startTime
}) {

  const videoRef = useRef(null);


  useEffect(() => {

    if (videoRef.current) {

      videoRef.current.currentTime =
        startTime;

      videoRef.current.play();
    }

  }, [startTime]);


  return (

    <div className="mt-6">

      <video
        ref={videoRef}
        controls
        autoPlay
        width="100%"
        style={{
          borderRadius: "10px"
        }}
      >

        <source
          src={mediaUrl}
          type="video/mp4"
        />

      </video>

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