import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

import {getProfile} from "../../actions/auth-actions";
import {cocktailLookup} from "../../actions/api-actions";
import {getAllDrinkRatings} from "../../services/ratings-service";
import {getUserFullName} from "../../services/users-service";

import Nav from "../home/nav";
import Review from "../review/review";
import {getAllDrinkReviews} from "../../services/reviews-service";
import DrinkComment from "./comment";
import {
  addFavoriteDrink,
  deleteFavoriteDrink,
  favoriteDrinkExists,
  getFavoriteBartenders
} from "../../services/favorite-drinks-service";

const DrinkDetails = () => {
  const stateProfile = useSelector((state) => state.auth.profile);
  const searchResults = useSelector((state) => state.api.results);
  const drinkDetails = useSelector((state) => state.api.details);

  const [profile, setProfile] = useState(stateProfile);
  const [details, setDetails] = useState();
  const [allReviews, setAllReviews] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bartenders, setBartenders] = useState([]);

  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (!details) {
      if (searchResults) {
        const currDetails = searchResults.find((r) => r.id === params.did);
        setDetails(currDetails);
      } else {
        const lookupString = `i=${params.did}`;
        cocktailLookup(dispatch, lookupString).catch((e) => alert(e));
      }
    }
  }, [dispatch, details, searchResults, params.did]);

  useEffect(() => {
    if (drinkDetails && drinkDetails.id === params.did) {
      setDetails(drinkDetails);
    }
  }, [drinkDetails, params.did]);

  useEffect(() => {
    const fetchAllDrinkRatings = async () => {
      let ratings = await getAllDrinkRatings(params.did);
      if (ratings) {
        const ratingDetails = await Promise.all(
          ratings.map(async (rating) => {
            const userFullName = await getUserFullName(rating.userId).then(
              (res) => res.fullName
            );
            return { ...rating, userFullName: userFullName };
          })
        ).then((res) => res);
        setAllReviews(ratingDetails);
      }
    };
    fetchAllDrinkRatings();
  }, [profile, params.did]);

  useEffect(() => {
    const fetchAllDrinkReviews = async () => {
      let ratings = await getAllDrinkReviews(params.did);
      if (ratings) {
        const ratingDetails = await Promise.all(
            ratings.map(async (rating) => {
              const userFullName = await getUserFullName(rating.userId).then(
                  (res) => res.fullName
              );
              return { ...rating, userFullName: userFullName };
            })
        ).then((res) => res);
        setAllComments(ratingDetails);
      }
    };

    const fetchIsFavorite = async () => {
      if (profile){
        try{
          let alreadyFavorite = await favoriteDrinkExists(profile._id, params.did)
          setIsFavorite(alreadyFavorite.length !== 0)
        } catch (e) {
          setIsFavorite(false)
        }
      }
    };

    const fetchBartenders = async () => {
      let bartendersList = await getFavoriteBartenders(params.did);
      setBartenders(bartendersList);
    }

    fetchAllDrinkReviews();
    fetchIsFavorite();
    fetchBartenders();
  }, [profile, params.did]);

  const fetchSetFavorite = async () => {
    if (isFavorite){
      console.log("Deleting drink")
      let response = await deleteFavoriteDrink(profile._id, params.did)
      setIsFavorite(false)
    }
    else {
      console.log("Adding drink")
      let response = await addFavoriteDrink(profile._id, params.did, profile.fullName, details.name)
      setIsFavorite(true)
    }
    window.location.reload()
  };

  function renderIngredients() {
    return (
      <ul className=" mb-2">
        {details.ingredients.map((i, index) => {
          return (
            <li key={index} className="">
              {i}
            </li>
          );
        })}
      </ul>
    );
  }

  function renderInstructions() {
    return (
      <ol className="mb-2">
        {details.instructions.map((i, index) => {
          return <li key={index}>{i}</li>;
        })}
      </ol>
    );
  }

  function renderBartenders() {
    if (bartenders.length === 0) {
      return (
          <p>No Bartenders :(</p>
      )
    }
    else {
      return (
          <div className="ms-3">
            <ul>
              {bartenders.map((b) => { return (
                <Link to={`/profile/${b.userId}`}>
                  <li className="padding-left-md" key={b.fullName}>{b.fullName}</li>
                </Link>
              )
              })}
            </ul>
          </div>
      );
    }
  }

  return (
    <>
      <Nav />
      <div className="container mt-4">
        {location.state && location.state.fromSearch && (
          <div className="row mb-2">
            <div className="col-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(-1)}
              >
                Back to search results
              </button>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 text-center">
            <h1>{details && details.name}</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-3">
            <img
                className="mw-100"
                src={details && `${details.image}`}
                alt="drink"
            />
          </div>

          <div className="col-9">
            <h3>Ingredients</h3>
            {details && renderIngredients()}
            <h3>Instructions</h3>
            {details && renderInstructions()}
          </div>

        </div>

        <div className="row">
          {profile && profile.role === "Bartender" ?
              <div>
                <button type="button" className="btn btn-primary" onClick={(e) => {
                  fetchSetFavorite()
                  setIsFavorite(!isFavorite)
                }}>
                  {isFavorite ? `Remove from drink collection` :  `Add to drink collection`}
                </button>
              </div>
              : ""
          }
        </div>
        <hr/>
        <div className="row">
          <h3>Bartenders Serving This Drink</h3>
          {renderBartenders()}
        </div>
        <hr/>
        <div className="row">
          <div className="col-12">
            {details && (
                <div>
                  <h3>Leave a Review!</h3>
                </div>
            )}
          </div>
          <div className="col-12">
            {details && (!profile || profile.role === "Bartender") && (
                <div>
                  <h5>You must be logged in as a customer to leave a review</h5>
                </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <div className="d-block">
              {details && profile && profile.role === "Customer" && (
                  <div>
                    <Review drink={details} profile={profile} />
                  </div>
              )}
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-12">
            <h3>
              Customer Reviews
            </h3>
          </div>
        </div>
        <div className="row mb-4">
          {allComments.map((comment) => {
            return <DrinkComment key={comment._id} comment={comment} isAuthor={comment.userId === profile._id}
                                 userId={comment.userId} drinkId={comment.drinkId} />;
          })}
        </div>
      </div>
    </>
  );
};

export default DrinkDetails;
