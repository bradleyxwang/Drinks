import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../actions/auth-actions";

import Nav from "../home/nav";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () =>
    loginUser(dispatch, user)
      .then((user) => navigate("/profile"))
      .catch((e) => setError(true));

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row mt-5 mb-2">
          <div className="offset-md-3 col-6">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3 col-6">
            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="name@example.com"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <label htmlFor="email">Email Address</label>
                <small id="login-help" className="form-text text-muted">
                  Don't have an account?{" "}
                  <Link to="/register">Register here!</Link>
                </small>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <label htmlFor="password">Password</label>
                <div
                  className={`pt-3 invalid-feedback ${
                    error ? "d-inline" : "d-none"
                  }`}
                >
                  The email and password you entered did not match our records.
                  Please try again.
                </div>
              </div>
              <div className="text-center mt-3 mb-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
