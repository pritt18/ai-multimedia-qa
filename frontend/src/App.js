import { useState } from "react";

import Upload from "./components/Upload";
import ChatBox from "./components/ChatBox";
import Summary from "./components/Summary";
import TimestampSearch from "./components/TimestampSearch";


function App() {

  const [fileId, setFileId] = useState("");

  const [mediaUrl, setMediaUrl] =
    useState("");


  return (

    <div className="min-h-screen bg-gray-900 text-white">

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10 text-center">

          AI Multimedia Q&A

        </h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">

          <Upload
            setFileId={setFileId}
            setMediaUrl={setMediaUrl}
          />

          {
            fileId &&
            <>
              <Summary fileId={fileId} />

              <ChatBox fileId={fileId} />

              <TimestampSearch
                fileId={fileId}
                mediaUrl={mediaUrl}
              />
            </>
          }

        </div>

      </div>

    </div>
  );
}

export default App;