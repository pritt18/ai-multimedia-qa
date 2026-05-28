import { useState } from "react";

import api from "../api";


function Summary({ fileId }) {

  const [summary, setSummary] = useState("");

  const getSummary = async () => {

    const res = await api.post(
      "/summary",
      {
        file_id: fileId
      }
    );

    setSummary(res.data.summary);
  };

  return (

    <div className="mt-8">

      <button
        onClick={getSummary}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
      >
        Generate Summary
      </button>

      {
        summary &&
        <div className="mt-6 bg-gray-700 p-5 rounded-lg">

          <h2 className="font-bold mb-2">
            AI Summary
          </h2>

          <p>{summary}</p>

        </div>
      }

    </div>
  );
}

export default Summary;