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

import Search from "../home/search";
import Nav from "../home/nav";

const SearchPage = () => {
  const stateProfile = useSelector((state) => state.auth.profile);

  const [profile, setProfile] = useState(stateProfile);

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

  return (
      <div>
        <Nav active="search" />
        <div className="container">
          <div className="text-center mt-3 mb-5">
            <img
                className="d-inline"
                src="drink-pic.jpg"
                alt="cocktail-clipart"
                height={150}
            />
            <h1 className="d-inline align-middle ms-4">Search</h1>
          </div>
          <Search profile={profile} />
        </div>
      </div>
  );
};

export default SearchPage;
