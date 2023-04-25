// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authenticateMiddleware = require("./middlewares/authenticate");
const errorMiddleware = require("./middlewares/error");

const authRoute = require("./routes/auth-route");
const proportionRoute = require("./routes/proportion-route");
const userRoute = require("./routes/user-route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: { message: "many requested, please try again" }
  })
);

app.use("/auth", authRoute);
app.use("/proportion", authenticateMiddleware, proportionRoute);
app.use("/user", authenticateMiddleware, userRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 6789;
app.listen(port, () => console.log(`server run on port ${port}`));
