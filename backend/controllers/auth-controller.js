import * as userModel from "../models/users.js";
import bcrypt from "bcrypt";

const authController = (app) => {
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.post("/api/auth/logout", logout);
  app.post("/api/auth/profile", profile);
};

const register = async (req, res) => {
  const newUser = req.body;
  const password = newUser.password;
  const hash = await bcrypt.hash(password, 10);
  newUser.password = hash;
  const existingUser = await userModel.findUserByEmail(req.body.email);
  if (existingUser) {
    res.sendStatus(403);
    return;
  } else {
    const createdUser = await userModel.registerUser(newUser);
    createdUser.password = "";
    req.session["profile"] = createdUser;
    res.json(createdUser);
  }
};

const login = async (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const existingUser = await userModel.findUserByEmail(email);
  let match;
  if (existingUser) {
    match = await bcrypt.compare(password, existingUser.password);
  }
  if (match) {
    existingUser.password = "";
    req.session["profile"] = existingUser;
    res.json(existingUser);
  } else {
    res.sendStatus(403);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const profile = (req, res) => {
  res.json(req.session["profile"]);
};

export default authController;
