const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.status(200).send("Pozz");
});

const authRoute = require("./routes/authRoute");

app.use("/api/auth", authRoute);

const PORT = 3000;
app.listen(PORT, () => console.log("Slusa na portu " + PORT));
