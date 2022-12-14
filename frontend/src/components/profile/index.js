import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";

import { getProfile } from "../../actions/auth-actions";
import {
  getUserById,
  updateEmail, updatePhone,
  updateRole
} from "../../services/users-service";

import { renderDateStr, getBirthday, getAge } from "../../utils/date";

import Nav from "../home/nav";
import ReviewedDrinks from "./reviews";
import RecentCommentReview from "../home/Comment";
import {getMostRecentCommentReviews} from "../../services/reviews-service";
import {getFavoriteDrinks} from "../../services/favorite-drinks-service";

const Profile = () => {
  const stateProfile = useSelector((state) => state.auth.profile);

  const [profile, setProfile] = useState(stateProfile);
  const [profileFetched, setProfileFetched] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [editPhone, setEditPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [mostRecentCommentReviews, setMostRecentCommentReviews] = useState([]);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
      setProfileFetched(true);
    }
    async function fetchOtherUser(userId) {
      const user = await getUserById(userId);
      setProfile(user);
    }
    const userId = params.uid;
    if (userId) {
      fetchOtherUser(userId);
    } else {
      fetchProfile();
    }
  }, [dispatch, params]);

  useEffect(() => {
    setProfile(stateProfile);

    if (stateProfile) {
      setNewEmail(stateProfile.email);
    }

  }, [stateProfile, params]);

  useEffect(() => {

    if (!profile && profileFetched) {
      navigate("/login");
    }
    else if (profile) {
      const fetchMostRecentCommentReviews = async () => {
        const reviews = await getMostRecentCommentReviews(profile._id);
        setMostRecentCommentReviews(reviews);
      };
      const fetchFavoriteDrinks = async () => {
        const favoriteDrinks = await getFavoriteDrinks(profile._id);
        setFavoriteDrinks(favoriteDrinks);
      };
      fetchMostRecentCommentReviews();
      fetchFavoriteDrinks();
    }
  }, [profile, profileFetched, params, navigate]);

  const error = (msg) => {
    setEditEmail(false);
    setNewEmail(profile.email);
    setEditPhone(false);
    setNewPhone(profile.phone);
    alert(msg);
  };

  const handleEmailChange = () => {
    if (newEmail === profile.email) {
      setEditEmail(false);
    } else if (newEmail === "") {
      error("Email cannot be blank.");
    } else {
      const updatedEmail = {
        userId: profile._id,
        email: newEmail,
      };
      updateEmail(updatedEmail).then((res) => {
        if (res.error) {
          error(res.error);
        } else {
          setEditEmail(false);
          setProfile({ ...profile, email: newEmail });
        }
      });
    }
  };

  const renderEmail = () => {
    if (!editEmail) {
      return (
        <>
          {profile.email}
          <i
            type="button"
            className="fas fa-pen float-end lh-base"
            onClick={(e) => {
              setEditEmail(!editEmail);
            }}
          ></i>
        </>
      );
    } else {
      return (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleEmailChange}
            >
              Save
            </button>
          </div>
        </div>
      );
    }
  };

  const handlePhoneChange = () => {
    if (newPhone === profile.phone) {
      setEditPhone(false);
    } else if (newPhone === "") {
      error("Phone cannot be blank.");
    } else {
      const updatedPhone = {
        userId: profile._id,
        phone: newPhone,
      };
      updatePhone(updatedPhone).then((res) => {
        if (res.error) {
          error(res.error);
        } else {
          setEditPhone(false);
          setProfile({ ...profile, phone: newPhone });
        }
      });
    }
  };

  const renderPhone = () => {
    if (!editPhone) {
      return (
          <>
            {profile.phone}
            <i
                type="button"
                className="fas fa-pen float-end lh-base"
                onClick={(e) => {
                  setEditPhone(!editPhone);
                }}
            ></i>
          </>
      );
    } else {
      return (
          <div className="input-group">
            <input
                type="text"
                className="form-control"
                id="phone"
                value={newPhone}
                onChange={(e) => {
                  setNewPhone(e.target.value);
                }}
            />
            <div className="input-group-append">
              <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handlePhoneChange}
              >
                Save
              </button>
            </div>
          </div>
      );
    }
  };

  const renderPersonalInfo = () => {
    return (
      <div className="row">
        <div className="col-xs-8 col-md-5">
          <p>
            <button
              className="btn btn-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accountInfo"
              aria-expanded="false"
              aria-controls="accountInfo"
              onClick={(e) => {
                if (!showPersonalInfo) {
                  setEditEmail(false);
                }
                setShowPersonalInfo(!showPersonalInfo);
              }}
            >
              {`${showPersonalInfo ? "" : ""}My Personal Information`}
            </button>
          </p>
          <div className="collapse" id="accountInfo">
            <div className="card card-body border-info">
              <table className="table card-table mb-0  border-info">
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td>{profile && renderEmail()}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{profile && renderPhone()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewCards = () => {
    return mostRecentCommentReviews.length > 0
        ? mostRecentCommentReviews.map((review) => (
            <RecentCommentReview profile={profile} review={review} key={review._id} />
        ))
        : <li className="ms-4">No reviews yet :(</li>;
  };

  return (
    <>
      <Nav active="profile" />
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h1>User{profile && `: ${profile.fullName}`}</h1>
          </div>
        </div>
        {params.uid ? <></> : renderPersonalInfo()}
        <hr className={showPersonalInfo ? "mt-0" : ""} />
        <h5>Role: {profile && profile.role}</h5>
        <h5>{profile && profile.role === "Bartender" ?
          "Bar Name: " : "Favorite Drink: "
        }
          {profile && profile.role === "Bartender" ?
              profile && profile.barName : profile && profile.favoriteDrink
          }
        </h5>
        <h5>Join Date: {profile && renderDateStr(profile.registerDate)}</h5>


        {profile && profile.role === "Bartender" ?
          <div className="row">
            <hr/>
            <h3>{profile.fullName}'s Drink Collection</h3>
            <ul className = "ms-5">
              {favoriteDrinks.length != 0 ? favoriteDrinks.map(d =>
                    <Link to={`/details/${d.drinkId}`} state={{ fromSearch: false }}>
                      <li>{d.drinkName}</li>
                    </Link>
              ) : <li>No drinks yet :(</li>}
            </ul>

          </div>
            :
            ""}
        {profile && profile.role === "Customer" ?
          <>
            <hr/>
            <div className="row mt-4">
              <div className="col-12">
                <h3>Recent Reviews</h3>
              </div>
            </div>
            <div className="row my-2">
              {renderReviewCards()}
            </div>

          </> : ""

        }
      </div>
    </>
  );
};

export default Profile;
