import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getProfile, logoutUser } from "../../actions/auth-actions";

const Nav = ({ active = "" }) => {
  const stateProfile = useSelector((state) => state.auth.profile);
  const [profile, setProfile] = useState(stateProfile);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
    }
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile]);

  const logout = async () => {
    await logoutUser(dispatch, profile);
    if (location && location.pathname === "/profile") {
      navigate("/login");
    } else {
      window.location.reload();
    }
  };

  const renderUserView = () => {
    return (
      <>
        <div className="navbar-text me-4">Logged in as {profile.fullName}</div>
        <div className="nav-item">
          <div className="btn nav-link" onClick={logout}>
            Logout
          </div>
        </div>
      </>
    );
  };

  const renderAnonymousView = () => {
    return (
      <div className="nav-item dropdown">
        <div
          className="btn nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Login/Register
        </div>
        <div className="dropdown-menu">
          <Link to="/login" className="dropdown-item">
            Login
          </Link>
          <Link to="/register" className="dropdown-item">
            Register
          </Link>
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Drinks!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                to="/home"
                className={`nav-link ${active === "home" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={`nav-link ${active === "profile" ? "active" : ""}`}
              >
                My Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link
                  to="/search"
                  className={`nav-link ${active === "search" ? "active" : ""}`}
              >
                Search
              </Link>
            </li>
          </ul>

          <div className="d-flex navbar-nav">
            {profile ? renderUserView() : renderAnonymousView()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
