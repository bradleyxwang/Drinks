import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../actions/auth-actions";

import Nav from "../home/nav";

const Register = () => {
  const [dob, setDob] = useState();
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Customer"
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = () => {
    if (
      newUser.fullName === "" ||
      newUser.email === "" ||
      newUser.password === ""
    ) {
      setError("All fields are required.");
    } else {
      registerUser(dispatch, newUser)
        .then(() => navigate("/profile"))
        .catch((e) =>
          setError("A user with this email address already exists.")
        );
    }
  };

  const renderError = () => {
    if (error.includes("exists")) {
      return (
        <>
          {error} <Link to="/login">Login here!</Link>
        </>
      );
    } else {
      return <>{error}</>;
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row mt-5 mb-2">
          <div className="offset-md-3 col-6">
            <h1>Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3 col-6">
            <div className="form-group">
              <div
                className={`invalid-feedback ${error ? "d-inline" : "d-none"}`}
              >
                {renderError()}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="fullName"
                  placeholder="John Smith"
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                />
                <label htmlFor="fullName">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                  type="phone"
                  className="form-control form-control-lg"
                  id="phone"
                  placeholder="111-222-3333"
                  onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                  }
              />
              <label htmlFor="email">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <select name="" id="" className="form-control form-control-lg" onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
              }>
                <option value="Customer">Customer</option>
                <option value="Bartender">Bartender</option>
              </select>
              <label htmlFor="role">Role</label>
            </div>

            {newUser.role === "Customer" ?
                <div className="form-floating mb-3">
                  <input
                      type="phone"
                      className="form-control form-control-lg"
                      id="phone"
                      placeholder="111-222-3333"
                      onChange={(e) =>
                          setNewUser({ ...newUser, favoriteDrink: e.target.value })
                      }
                  />
                  <label htmlFor="email">Favorite Drink</label>
                </div>
                :
                <div className="form-floating mb-3">
                  <input
                      type="phone"
                      className="form-control form-control-lg"
                      id="phone"
                      placeholder="111-222-3333"
                      onChange={(e) =>
                          setNewUser({ ...newUser, barName: e.target.value })
                      }
                  />
                  <label htmlFor="email">Bar Location</label>
                </div>

            }


            <div className="text-center mb-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
