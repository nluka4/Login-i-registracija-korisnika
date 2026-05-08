const { users } = require("../model/users.json");
function registerController(req, res) {
  const user = req.body;

  if (!user) {
    res.status(404).send("User nije registrovan, pokusajte ponovo.");
  }

  users.push(user);

  console.log(users);
  res.status(200).json(req.body);
}

module.exports = registerController;
