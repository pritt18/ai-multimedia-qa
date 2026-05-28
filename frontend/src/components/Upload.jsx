import { useState } from "react";

import api from "../api";


function Upload({ setFileId, setMediaUrl }) {

  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    const formData = new FormData();

    formData.append("file", file);

    const res = await api.post(
      "/upload",
      formData
    );

    setFileId(res.data.file_id);

    if (
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {

      const filename =
        res.data.file_path.split("/").pop();

      setMediaUrl(
        `http://127.0.0.1:8000/uploads/${filename}`
      );
    }

    alert("Uploaded Successfully");
  };

  return (

    <div className="flex gap-4 items-center">

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="bg-gray-700 p-2 rounded"
      />

      <button
        onClick={uploadFile}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
      >
        Upload
      </button>

    </div>
  );
}

export default Upload;