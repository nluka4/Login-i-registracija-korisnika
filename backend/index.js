const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require("./docs/auth.json");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use((req, res, next) => {
  req.body = req.body || {};
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Pozz");
});

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));

const authRoute = require("./routes/authRoute");

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Slusa na portu " + PORT));
