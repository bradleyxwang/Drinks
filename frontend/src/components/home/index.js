import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProfile } from "../../actions/auth-actions";
import {
  getMostPopularUsers,
  getMostRecentReviews,
} from "../../services/ratings-service";
import {getMostRecentCommentReviews} from "../../services/reviews-service";
import {getAllUsers, getUserBasicInfo} from "../../services/users-service";

import { renderDateStr } from "../../utils/date";

import Search from "./search";
import Nav from "./nav";
import RecentReview from "./review";
import Card from "./card";
import RecentCommentReview from "./Comment";
import {Link} from "react-router-dom";
import {getFavoriteDrinks} from "../../services/favorite-drinks-service";

const Home = () => {
  const stateProfile = useSelector((state) => state.auth.profile);

  const [profile, setProfile] = useState(stateProfile);
  const [mostPopularUsers, setMostPopularUsers] = useState([]);
  const [mostRecentReviews, setMostRecentReviews] = useState([]);
  const [mostRecentCommentReviews, setMostRecentCommentReviews] = useState([]);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
    }
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile]);

  useEffect(() => {
    const fetchMostPopularUsers = async () => {
      const users = await getAllUsers();
      if (users) {
        const userDetails = await Promise.all(
          users.map(async (user) => {
            const { fullName, registerDate } = await getUserBasicInfo(
              user._id
            ).then((res) => {
              return { fullName: res.fullName, registerDate: res.registerDate };
            });
            return { ...user, fullName: fullName, registerDate };
          })
        ).then((res) => res);
        setMostPopularUsers(userDetails);
      }
    };

    const fetchMostRecentReviews = async () => {
      const reviews = await getMostRecentReviews(profile._id);
      setMostRecentReviews(reviews);
    };

    const fetchMostRecentCommentReviews = async () => {
      const reviews = await getMostRecentCommentReviews(profile._id);
      setMostRecentCommentReviews(reviews);
    };

    const fetchFavoriteDrinks = async () => {
      const favoriteDrinks = await getFavoriteDrinks(profile._id);
      setFavoriteDrinks(favoriteDrinks);
    };

    if (profile) {
      fetchMostRecentReviews();
      fetchMostRecentCommentReviews();
      fetchFavoriteDrinks();
    } else {
      fetchMostPopularUsers();
    }
  }, [profile]);

  const renderUserCards = () => {
    return (<ul className = "ms-5">{
      mostPopularUsers.map((user) => {
        return (
            <Link to={`/profile/${user._id}`}>
              <li>{user.fullName}</li>
            </Link>
        )
    })}
      </ul>)
    /*
    mostPopularUsers.map((user) => {
      const cardInfo = {
        headerLink: `/profile/${user._id}`,
        headerText: user.fullName,
        body: <h4 className="mb-0">{`${user.role}`}</h4>,
        footer: `Registered ${renderDateStr(user.registerDate)}`,
      };
      return (
        <div className="col-4" key={user._id}>
          <Card {...cardInfo} />
        </div>
      );
    });

     */
  };

  /*
  const renderReviewCards = () => {
    return mostRecentReviews.length > 0
      ? mostRecentReviews.map((review) => (
          <RecentReview profile={profile} review={review} key={review._id} />
        ))
      : "No reviews yet :(";
  };

   */


  const renderReviewCards = () => {
    return mostRecentCommentReviews.length > 0
        ? mostRecentCommentReviews.map((review) => (
            <RecentCommentReview profile={profile} review={review} key={review._id} />
        ))
        : "No reviews yet :(";
  };

  return (
    <div>
      <Nav active="home" />
      <div className="container">
        <div className="text-center mt-3 mb-5">
          <img
            className="d-inline"
            src="drink-pic.jpg"
            alt="cocktail-clipart"
            height={150}
          />
          <h1 className="d-inline align-middle ms-4">Drinks!</h1>
        </div>
        <Search profile={profile} />
        <div className="row mt-4">
          <div className="col-12">
            <h3>{profile ? profile.role === "Customer" ? "Your Recent Reviews" : "Your Drink Collection" : "Newest Users"}</h3>
          </div>
        </div>
        <div className="row my-2">
          {profile ?
              profile.role === "Customer" ? renderReviewCards() :
                      <ul className = "ms-5">
                        {favoriteDrinks.length != 0 ? favoriteDrinks.map(d =>
                            <Link to={`/details/${d.drinkId}`} state={{ fromSearch: false }}>
                              <li>{d.drinkName}</li>
                            </Link>
                        ) : <li>No drinks yet :(</li>}
              </ul>
               :
              renderUserCards()}
        </div>
      </div>
    </div>
  );
};

export default Home;
