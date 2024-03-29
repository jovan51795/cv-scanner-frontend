import React, { useState, useEffect } from "react";
import { getToken, login } from "../services/keycloak";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (getToken()) {
      navigate("/admin");
    }
  }, []);

  const submit = (e) => {
    // const data = new URLSearchParams();
    // data.append("grant_type", "password");
    // data.append("client_id", "cv_scanner");
    // // data.append("username", "cv_scanner_user");
    // // data.append("password", "77-keycloak-pass-dev");
    // data.append("username", username);
    // data.append("password", password);

    const userCred = {
      email: username,
      password: password,
    };
    e.preventDefault();
    if (username || password) {
      login(userCred)
        .then((res) => {
          if (res.data) {
            sessionStorage.setItem("cv_tagging", JSON.stringify(res.data));
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error && error.response.status === 401) {
            alert("Invalid username or password");
          } else {
            alert("Unknown error occured");
          }
        });
    } else {
      alert("Please fill the required fields!");
    }
  };
  return (
    <div
      className="form-container"
      onSubmit={submit}
      style={{ backgroundColor: "#222222" }}
    >
      <form className="form">
        <div className="logo-container">LOGIN</div>
        <div className="input-container">
          <div className="group-wrapper">
            <div className="group">
              <input
                autoComplete="true"
                required
                className="input"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="group">
              <input
                autoComplete="true"
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
