const fs = require("fs/promises");
const fileName = "./model/users.json";
const path = require("path");
function getRandomId(min, max, usersJSON) {
  let { users } = usersJSON;
  let id;
  do {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    id = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  } while (users?.find((el) => el._id == id));

  return id;
}

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
    user._id = getRandomId(0, 1000, dataJSON);

    user._role = {
      viewer: true,
      admin: false,
      groupOwner: {},
      goupAdmin: {},
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
