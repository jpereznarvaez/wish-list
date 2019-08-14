const app = require("express").Router();
const { auth, authPPort } = require("../services/index");
const { userController } = require("./index");

//Client - Render views
app.get("/register", userController.viewRegister);
app.get("/login", userController.viewLogin);
app.get("/users", authPPort.isAuthenticated, userController.viewGetUsers);
app.get("/update-user", authPPort.isAuthenticated, userController.viewUpdate);
app.get(
  "/set-card/:id?",
  authPPort.isAuthenticated,
  userController.viewSetCard
);
app.get(
  "/update-card/:id?",
  authPPort.isAuthenticated,
  userController.viewUpdateCard
);
app.get("/profile", authPPort.isAuthenticated, userController.viewUser);
app.get("/logout", userController.logOut);

//API - Show data -> response json
//app.get("/get-user/:id", authPPort.isAuthenticated, userController.getUser);
app.get(
  "/get-current-user",
  authPPort.isAuthenticated,
  userController.getCurrentUser
);
app.get("/get-all-users", authPPort.isAuthenticated, userController.getUsers);

//Actions
app.post("/register", userController.registerPassport);
app.post("/login", userController.loginPassport);
app.post(
  "/set-card/:userId",
  authPPort.isAuthenticated,
  userController.setCard
);
app.put("/update-user", authPPort.isAuthenticated, userController.updateUser);
app.put("/update-card", authPPort.isAuthenticated, userController.updateCard);
app.delete(
  "/delete-card",
  authPPort.isAuthenticated,
  userController.deleteCard
);

app.get("*", function(req, res) {
  res.render("user/not-found");
});
module.exports = app;