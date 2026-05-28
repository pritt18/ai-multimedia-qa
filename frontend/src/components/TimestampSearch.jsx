import { useState } from "react";

import api from "../api";

import MediaPlayer from "./MediaPlayer";


function TimestampSearch({
  fileId,
  mediaUrl
}) {

  const [topic, setTopic] = useState("");

  const [timestamps, setTimestamps] = useState([]);

  const [selectedTime, setSelectedTime] =
    useState(0);


  const searchTopic = async () => {

    const res = await api.post(
      "/timestamps",
      {
        file_id: fileId,
        topic
      }
    );

    setTimestamps(res.data.timestamps);
  };


  return (

    <div className="mt-8">

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Search topic in audio/video..."
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
          className="flex-1 p-3 rounded-lg bg-gray-700"
        />

        <button
          onClick={searchTopic}
          className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
        >
          Search
        </button>

      </div>

      {
        timestamps.length > 0 &&
        <div className="mt-6 bg-gray-700 p-5 rounded-lg">

          <h2 className="font-bold mb-4">
            Matching Timestamps
          </h2>

          {
            timestamps.map((item, index) => (

              <div
                key={index}
                className="mb-4 border-b border-gray-600 pb-4"
              >

                <p>
                  <strong>Start:</strong>
                  {" "}
                  {item.start.toFixed(2)} sec
                </p>

                <p>
                  <strong>End:</strong>
                  {" "}
                  {item.end.toFixed(2)} sec
                </p>

                <p className="mt-2">
                  {item.text}
                </p>

                <button
                  onClick={() =>
                    setSelectedTime(item.start)
                  }
                  className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Play
                </button>

              </div>

            ))
          }

        </div>
      }

      {
        mediaUrl &&
        <MediaPlayer
          mediaUrl={mediaUrl}
          startTime={selectedTime}
        />
      }

    </div>
  );
}

export default TimestampSearch;
