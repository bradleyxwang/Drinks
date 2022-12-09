import * as usersModel from "../models/users.js";

const usersController = (app) => {
  app.get("/api/users/:uid", getUserById);
  app.get("/api/allUsers", getAllUsers);
  app.get("/api/users/fullName/:uid", getUserFullName);
  app.get("/api/users/basicInfo/:uid", getUserBasicInfo);
  app.put("/api/users/updateEmail", updateEmail);
  app.put("/api/users/updatePhone", updatePhone);
  app.put("/api/users/updateRole", updateRole);
};

const getUserById = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserById(userId);
  user.password = "";
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await usersModel.findAllUsers();
  res.json(users);
};

const getUserFullName = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserFullName(userId);
  res.json(user);
};

const getUserBasicInfo = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserBasicInfo(userId);
  res.json(user);
};

const updateEmail = async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const newEmail = body.email;
  const allEmails = await usersModel
    .findAllEmails()
    .then((res) => res.map((u) => u.email));
  if (allEmails.includes(newEmail)) {
    res.json({ error: "A user with this email address already exists." });
  } else {
    const status = await usersModel.updateUser(userId, { email: newEmail });
    if (status.modifiedCount === 1) {
      req.session["profile"].email = newEmail;
    }
    res.json(status);
  }
};

const updatePhone = async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const newPhone = body.phone;
  const status = await usersModel.updateUser(userId, { phone: newPhone });
  if (status.modifiedCount === 1) {
    req.session["profile"].phone = newPhone;
  }
  res.json(status);
};

const updateRole = async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const newRole = body.role;
  const status = await usersModel.updateUser(userId, { role: newRole });
  if (status.modifiedCount === 1) {
    req.session["profile"].role = newRole;
  }
  res.json(status);
};

export default usersController;
