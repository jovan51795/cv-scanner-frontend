import axios from "axios";
import React, { useState } from "react";

const Applicants = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    var fileData1 = new FormData();
    fileData1.append("file", file);
    setFileData(fileData1);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post(
        `http://localhost:8080/api/scan?profile=${encodeURIComponent(
          JSON.stringify(data)
        )}`,
        fileData
      )
      .then((res) => {
        console.log(res, "the result");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rescan = (mode) => {
    console.log(data, "the data");
    axios
      .post(
        `http://localhost:8080/api/rescan?profile=${encodeURIComponent(
          JSON.stringify(data)
        )}&mode=${mode}`
      )
      .then((res) => {
        console.log(res, "the result");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <br></br>
        <label>Upload resume / CV</label>

        <input type="file" name="file" onChange={handleFileChange} />
        <br></br>
        <input type="submit" value="Submit" />
        <br></br>
      </form>

      <button onClick={() => rescan("advance")}>Advance scan</button>
      <button onClick={() => rescan("partialscan")}>partialscan scan</button>
    </div>
  );
};

export default Applicants;
