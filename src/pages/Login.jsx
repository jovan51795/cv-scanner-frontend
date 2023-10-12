import React, { useState } from "react";
import { login, getToken } from "../services/keycloak";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const submit = (e) => {
    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("client_id", "cv_scanner");
    // data.append("username", "cv_scanner_user");
    // data.append("password", "77-keycloak-pass-dev");
    data.append("username", username);
    data.append("password", password);
    e.preventDefault();
    if (username || password) {
      login(data)
        .then((res) => {
          if (res.data) {
            sessionStorage.setItem("cv_tagging", JSON.stringify(res.data));
          }
        })
        .catch((error) => {
          alert("Unknown error occured");
        });
    } else {
      alert("Please fill the required fields!");
    }
  };
  return (
    <div className="form-container" onSubmit={submit}>
      <form className="form">
        <div className="logo-container">LOGIN</div>
        <div className="input-container">
          <div className="group-wrapper">
            <div className="group">
              <input
                required
                className="input"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="group">
              <input
                required
                className="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="group">
              <input className="input submit" type="submit" value="Submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;