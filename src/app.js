// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authenticateMiddleware = require("./middlewares/authenticate");

const authRoute = require("./routes/auth-route");
const proportionRoute = require("./routes/proportion-route");
const userRoute = require("./routes/user-route");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/proportion", authenticateMiddleware, proportionRoute);
app.use("/user", authenticateMiddleware, userRoute);

const port = process.env.PORT || 6789;
app.listen(port, () => console.log(`server run on port ${port}`));
