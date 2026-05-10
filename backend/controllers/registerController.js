const fs = require("fs/promises");
const fileName = "./model/users.json";
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function registerController(req, res) {
  /*
  req.body trenutno izgleda ovako zbog toga sto req.body nosi 
  objekat od multer biblioteke koji nije kreiran sa klasicnim js prototipom

  [Object: null prototype] {
    _email: ...
  }

  zbog ovoga smo kopirali/spreadovali(destruktuirali) objekat
  */
  const user = { ...req.body };

  try {
    const dataVar = await fs.readFile(
      path.join(__dirname, "../model") + "/users.json",
      "utf8",
    );

    let usersUpdated;
    const dataJSON = JSON.parse(dataVar);

    //dodeljivanje id-ja i role-a
    user._id = uuidv4();

    user._role = {
      viewer: true,
      admin: false,
      groupOwner: {},
      groupAdmin: {},
    };

    if (Object.entries(dataJSON).length === 0) {
      usersUpdated = [user];
      await fs.writeFile(fileName, JSON.stringify({ users: usersUpdated }));
      return res.status(201).json(user);
    }

    usersUpdated = [...dataJSON.users, user];

    await fs.writeFile(fileName, JSON.stringify({ users: usersUpdated }));
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

module.exports = registerController;
