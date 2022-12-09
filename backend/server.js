import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";

import authController from "./controllers/auth-controller.js";
import ratingsController from "./controllers/ratings-controller.js";
import reviewsController from "./controllers/reviews-controller.js";
import usersController from "./controllers/users-controller.js";
import favoriteDrinksController from "./controllers/favorite-drinks-controller.js";

const CONNECTION_STRING = "mongodb://localhost:27017";
mongoose.connect(CONNECTION_STRING);

const app = express();

let sess = {
  name: "MySession",
  secret: process.env.SECRET || "SECRET",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};

let cors_origin = "http://localhost:3000";
if (process.env.ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
  sess.cookie.sameSite = "none";
  cors_origin = "https://dazzling-mochi-cdc080.netlify.app";
}

app.use(session(sess));
app.use(cors({ credentials: true, origin: cors_origin }));
app.use(express.json());

authController(app);
ratingsController(app);
usersController(app);
reviewsController(app);
favoriteDrinksController(app);

app.listen(process.env.PORT || 4000);
