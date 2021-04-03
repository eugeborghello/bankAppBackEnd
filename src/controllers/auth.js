const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const bcrypt = require("bcrypt");

// register
exports.createUser = async (req, res) => {
  var nuevoUser;
  const { name, lastName, email, password, address, dni } = req.body;
  Users.insertMany({ name, lastName, email, password, address, dni })
    .then((user) => {
      nuevoUser = user[0];
      return nuevoUser.encryptPassword(password);
    })
    .then((nuevoPass) => {
      nuevoUser.password = nuevoPass;
      return nuevoUser.save();
    })

    .then((user) => res.status(200).json({ status: "success", response: user }))
    .catch((error) =>
      res.status(400).json({ status: "error", message: error.message })
    );
};

//login
exports.postLogin = async (req, res) => {

  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Users.findOne({ email: email });
    console.log(user)
    if (user) {
        const validPassword = await bcrypt.compareSync(password, user.password);
      if (user ) {
        const token = await user.generateAuthToken();
        
        res
          .status(200)
          .json({ status: "success", response: user});
      } else {
        throw new Error(" Incorrect Password");
      }
    } else {
      throw new Error("Not found Email");
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};


