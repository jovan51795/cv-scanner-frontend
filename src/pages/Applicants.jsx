import axios from "axios";
import React, { useState } from "react";
import { env } from "../env";

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

  //http://localhost:8222/api2/v1/scanner/tags
  //http://localhost:8222/api/get-tags
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${env.baseURL}/api/v1/scanner/scan?profile=${encodeURIComponent(
          JSON.stringify(data)
        )}`,
        fileData
      )
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    axios
      .post(`${env.baseURL}/api2/v1/scanner/get-tags/`, fileData)
      .then((res) => {})
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

      <button onClick={handleSubmit2}>Get Tags</button>
    </div>
  );
};

export default Applicants;
