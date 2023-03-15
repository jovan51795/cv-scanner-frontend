import axios from "axios";
import React, { useState } from "react";

const Applicants = () => {
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
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
        `http://localhost:8080/api/register?user=${encodeURIComponent(
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
        <label>First Name</label>

        <input
          type="text"
          name="first_name"
          value={data.first_name}
          onChange={handleChange}
        />
        <br></br>
        <label>Last Name</label>

        <input
          type="text"
          name="last_name"
          value={data.last_name}
          onChange={handleChange}
        />
        <br></br>
        <label>Upload resume / CV</label>

        <input type="file" name="file" onChange={handleFileChange} />
        <br></br>
        <input type="submit" value="Submit" />
        <br></br>
      </form>
    </div>
  );
};

export default Applicants;
