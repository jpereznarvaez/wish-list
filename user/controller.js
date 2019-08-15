const { User } = require("./index");
const passport = require("passport");

const viewRegister = (req, res) => {
  res.render("user/register");
};

const loginPassport = passport.authenticate("local-signin", {
  successRedirect: "/",
  failureRedirect: "/user/login",
  failureFlash: true
});

const registerPassport = passport.authenticate("local-signup", {
  successRedirect: "/user/login",
  failureRedirect: "/user/login",
  failureFlash: true
});

const viewLogin = (req, res) => {
  res.render("user/login");
};

const getCurrentUser = (req, res) => {
  return res.status(200).json(req.user);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  await User.findById(id)
    .populate("nodemcu", "serial status")
    .then(user => {
      user.password = undefined;
      if (user) return res.status(200).json(user);
      else return res.status(404).send({ Error: `User doesn't exist` });
    })
    .catch(err => {
      res.status(500).send({ Alert: `Error on query`, Error: err });
    });
};

const viewUser = async (req, res) => {
  req.flash("success_msg", "Hola Guapo");
  return res.render("user/profile");
};

const viewGetUsers = (req, res) => {
  res.render("user/get-users");
};

const getUsers = async (req, res) => {
  console.log("TCL: getUsers -> req.user", req.user);
  await User.find({})
    .populate("nodemcu")
    .then(users => {
      if (users.length > 0) return res.status(200).json(users);
      else return res.status(404).json({ Error: `No users` });
    })
    .catch(err => res.status(400).json({ Error: err }));
};

const viewUpdate = async (req, res) => {
  const user = req.user;

  return res.render("user/form", { user });
};

const updateUser = async (req, res) => {
  const { _id, name, surname, email } = req.body;
  const errors = [];
  console.log("TCL: updateUser");

  if (!name) errors.push({ error: "Please write a name" });
  if (!surname) errors.push({ error: "Please write a surname" });
  if (!email) errors.push({ error: "Please write an email" });

  if (errors.length > 0) {
    console.log("On error update", errors);
    /* res.render("user/form", {
      errors,
      user: { _id, name, surname, email }
    }); */
    return res.status(200).json({ errors });
  } else {
    const userUpdated = await User.findOneAndUpdate(
      { _id: _id },
      { name, surname, email },
      { new: true }
    );

    if (userUpdated) {
      userUpdated.password = undefined;
      return res.status(200).send(userUpdated);
    } else {
      console.log("Not updated");
      return res.status(204).json({ error: `User don't update` });
    }
  }
};

const getNodemcu = (req, res) => {};

const viewSetCard = (req, res) => {
  const { id } = req.params;
  res.render("card/add-card-user", { user: id });
};

const setCard = async (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;
  const errors = [];

  if (!code) errors.push({ error: "Please write a code" });

  if (errors.length > 0) {
    return res.render("card/add-card-user", { errors, code, user: userId });
  } else {
    const cardUpdated = await Card.findOneAndUpdate(
      { code: Number(code) },
      { isUsed: true },
      { new: true }
    );

    if (cardUpdated) {
      const hour = moment()
        .subtract("5", "hours")
        .format("HH:mm:ss");
      const date = moment()
        .subtract("5", "hours")
        .format("MMM DD YYYY");

      const cardUser = new CardUser({
        user: userId,
        card: cardUpdated._id,
        createdAt: `${date} ${hour}`
      });

      cardUser.save().then((saved, err) => {
        if (err) {
          errors.push({ error: err });
          return res.render("card/add-card-user", {
            errors,
            code,
            user: userId
          });
        }
        if (saved) {
          req.flash("success_msg", "Card added successfully");
          return res.redirect("/");
        }
      }); //End of cardUser
    }

    if (!cardUpdated) {
      errors.push({ error: "Card doesnt exist" });
      return res.render("card/add-card-user", {
        errors,
        code,
        user: userId
      });
    }
  }
};

const viewUpdateCard = async (req, res) => {
  const { id } = req.params;

  const card = await Card.findOne({ _id: id });

  if (card) return res.render("user/card-form", { card });
};

const updateCard = async (req, res) => {
  const { card_id, pin } = req.body;

  const cardUpdated = await Card.findByIdAndUpdate(
    card_id,
    { pin: pin },
    { new: true }
  );

  if (cardUpdated) {
    req.flash("success_msg", "Card updated successfully");
    return res.redirect("/");
  } else return res.status(400).send({ message: "Card didnt updated " });
};

const deleteCard = async (req, res) => {
  const { card_id } = req.body;

  const cardUpdated = await Card.findByIdAndUpdate(
    card_id,
    { isUsed: false },
    { new: true }
  );

  if (cardUpdated) {
    console.log("Card user deleted", cardUpdated);
    const cardDeleted = await CardUser.findOneAndDelete({ card: card_id });

    if (cardDeleted) {
      req.flash("success_msg", "Card deleted successfully");
      return res.render("index");
    } else {
      req.flash("error_msg", "Error Card deleting");
      return res.status(400).json({ Error: `Error deleting card` });
    }
  } else {
    req.flash("error_msg", "Error Card deleting");
    return res.status(400).json({ Error: `Error deleting card` });
  }
};

const logOut = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  getCurrentUser,
  registerPassport,
  loginPassport,
  updateUser,
  getUser,
  getUsers,
  getNodemcu,
  setCard,
  updateCard,
  deleteCard,
  logOut,
  viewLogin,
  viewRegister,
  viewUpdate,
  viewSetCard,
  viewUser,
  viewGetUsers,
  viewUpdateCard
};