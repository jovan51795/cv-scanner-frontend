import React, { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-container" onSubmit={submit}>
      <form className="form">
        <div className="logo-container">LOGIN</div>
        <div className="input-container">
          <div className="group-wrapper">
            <div className="group">
              <svg
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
              <input
                required
                className="input"
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  setLogin({ email: e.target.value, password: login.password })
                }
              />
            </div>
            <div className="group">
              <svg
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
              <input
                required
                className="input"
                type="password"
                placeholder="password"
                onChange={(e) =>
                  setLogin({ password: e.target.value, email: login.email })
                }
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
