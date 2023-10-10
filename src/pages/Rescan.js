import React, { useState } from "react";
import axios from "axios";
import { env } from "./env";

const Rescan = () => {
  const [data, setData] = useState("");
  const rescan = (e, mode) => {
    e.preventDefault();
    axios
      .post(
        `${env.baseURL}/api2/v1/scanner/rescan?profile=${encodeURIComponent(
          JSON.stringify({ email: data })
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
    <div>
      <label>Email</label>
      <input
        type="email"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <br />
      <input
        type="submit"
        value="Full Scan"
        onClick={(e) => rescan(e, "advance")}
      />
      <input
        type="submit"
        value="Partial Scan"
        onClick={(e) => rescan(e, "partial")}
      />
    </div>
  );
};

export default Rescan;
